---
page-type-slug: finding
slug: a-ready-endpointslice-hides-the-deleted-service-from-every-reader
title: "kubectl reports the deleted service's endpoints empty while a hand-written ready slice routes the deployed apps at a dead port"
domain-slug: domain/page-queries-system
---

# Claim

`kubectl get endpoints` answers "No resources found" for a service whose endpoints are populated. That one lie is why the page query service looked deleted for nine days while in-cluster callers kept reaching it. The namespace holds no workload, but it holds a `Service` and a hand-written `EndpointSlice` with no owner, marked `conditions.ready: true`, pointing at this workstation's LAN address on a port nothing listens on. Nothing in Kubernetes was ever going to catch that: a slice nothing owns has no controller to mark it unhealthy, and the deprecated `v1 Endpoints` shim reports "I no longer see this resource kind" in the same words it reports "there is nothing here". A true empty and a failed read spelled alike, at cluster scale.

Behind that, the deployed web apps are in outage now. The pod's own logs carry thirty-one route-loader throws in a forty-four minute window, each one a composed query dying on `http://page-query-service.page-query-service.svc.cluster.local:8787`. Nothing sets `PAGE_QUERY_ORIGIN` for any app, `globalThis.location` is undefined under Bun, so `pageQueryOrigin()` returns the cluster constant on every server-side read those apps make. Thirty-three modules across six deployed apps reach `@shared/pages-query`, and no app installs a fetcher.

Two modules make the identical failed read and behave in opposite directions. One throws and errors the page. The other catches, logs, and returns `navItems: null` to a signed-in reader, who is shown an empty navigation and told nothing. Only the first is a refusal. The second is a failed read handed back as an answer, which is the thing the pages system says never to do, in the surface a person actually looks at.

# Evidence

Read and run on 2026-08-28 against `bccf33790` on `main`. Every cluster reading is from the deployment side — `kubectl` against object state and pod logs. No production endpoint was called.

**The shim lies, and that is the general defect.** `kubectl -n page-query-service get endpoints` answers `No resources found in page-query-service namespace`, above a deprecation warning saying `v1 Endpoints is deprecated in v1.33+; use discovery.k8s.io/v1 EndpointSlice`. The EndpointSlice is populated: `kubectl -n page-query-service get endpointslices -o wide` gives `page-query-service   IPv4   8787   192.168.68.50   9d`, and its JSON carries `endpoints: [{"addresses":["192.168.68.50"],"conditions":{"ready":true}}]` with `ownerReferences: null`. So the resource kind the shim cannot see is the one holding the answer, and the empty it printed is indistinguishable from a namespace with nothing in it. This is Answer Or Refuse on `pages/domain/pages-system.domain.md:34-42` — "Never read a missing source as an empty one" — broken by the platform's own read surface.

**A slice with no owner cannot be marked unhealthy.** `ownerReferences: null` means no Service controller and no EndpointSlice controller maintains it; it was written by hand and nothing reconciles it. Its `conditions.ready: true` is therefore permanent regardless of what stands at the address. `kubectl -n page-query-service get all` returns the `Service` alone — no Deployment, no Pod, no ReplicaSet. The namespace is 9d old and so is the slice.

**The address is this workstation, and nothing listens on it.** `ip -4 addr show` gives `inet 192.168.68.50/22 … enp129s0` — the slice points at this machine's LAN address. `ss -ltn` filtered to port 8787 returns nothing on any interface, and `curl -s -m 3 http://127.0.0.1:8787/` returns exit 7. So an in-cluster caller resolves the ClusterIP `10.100.134.88`, is routed back out to the workstation, and is refused.

**The outage is live and the pod says so.** `kubectl -n alanwalton logs web-874d9684f-jcxg6 -c web --tail=4000` carries 31 lines matching `page-query-service`, all one shape. With `--timestamps` the window runs `2026-08-28T04:22:07.125Z` to `2026-08-28T05:06:28.536Z`. The line and its stack:

```
error: device-secrets lookup failed: `a composed query over `device-secret`` went unasked:
http://page-query-service.page-query-service.svc.cluster.local:8787/q gave no answer within 5000ms
  at resolveDeviceSecretContext (/app/repo/packages/alanwalton/web/build/server/index.js:16912:27)
  at async guardReadout (…:17025:27)
  at async loader$30 (…:17197:24)
  at async callRouteHandler (react-router/dist/development/index.js:632:22)
```

It is a React Router route loader throwing, repeatedly, in production.

**Nothing states an origin for any app.** `kubectl -n alanwalton get pod web-874d9684f-jcxg6 -o json` gives container `web` on image `cluster/bun-git:latest` with command `["bun","run","start"]` and env names `NODE_ENV, HOST, PORT, PAGE_WRITER, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN, SUPABASE_JWT_SECRET, SEAWEEDFS_S3_ENDPOINT, SEAWEEDFS_BUCKET, SEAWEEDFS_ACCESS_KEY, SEAWEEDFS_SECRET_KEY` — no `PAGE_QUERY_ORIGIN`. It draws `envFrom` the secret `alanwalton-secrets`, whose 20 keys are `ADMIN_USER_ID, CRON_SECRET, DATABASE_URL, GEOAPIFY_API_KEY, GIT_ACCESS_TOKEN, JWT_SECRET, MCP_API_KEY, MONARCH_COOKIE, NEXT_PUBLIC_SUPABASE_ANON_KEY, POSTGREST_DB_URL, POSTGRES_PASSWORD, SCRAPERAPI_API_KEY, SMILINGJENNY_RELAY_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL, TELNYX_PUBLIC_KEY, TRAKT_CLIENT_ID, WEBHOOK_SECRET` — none matching. Values were never read.

**So the fallback is the dead address, measured rather than reasoned.** `bun -e` reports `typeof globalThis.location: undefined`, so `browserOrigin()` at `shared/pages-query/src/index.ts:16-22` returns null. Running the real resolver inside `alanwalton/web` with the variable unset prints `pageQueryOrigin() => http://page-query-service.page-query-service.svc.cluster.local:8787`. No app arms the seam: `grep -rn "fetchThrough\|pagesFetcher"` over `alanwalton/web`, `temper/web`, `audhdalan/web`, `archive-of-worlds/web` and `smilingjenny/web` returns nothing.

**Two modules, one failure, opposite behaviours.** `alanwalton/web/app/lib/home-dni.server.ts:19-25` calls `askComposed` with no fetcher and at `:26-28` does `throw new Error(...)` on `!asked.ok`. It is reached from `alanwalton/web/app/routes/home.tsx:17`, inside that route's `loader` at `:13-19`, for any signed-in user. `alanwalton/web/app/routes/_app-layout.tsx:12-31` makes a near-identical `askComposed` and wraps it in `try`/`catch`, logging `[alanwalton/web/_app-layout] nav SSR fetch failed` and returning `navItems: null`. That layout wraps `home`, `principles`, `design`, `:pageTypeSlug` and `:pageTypeSlug/:pageHrefParam` per `alanwalton/web/app/routes.ts:4-10`, so the swallowed case is the common one. Not measured, and I could not explain it: the 4000-line log window carries zero occurrences of `nav SSR fetch failed` while carrying 31 of the device-secret throw.

**The browser's own escape hatch ends at the same address.** `shared/pages-access/src/answer.ts:8-16` states that apps answer `/api/page-types` and `/api/pages/:pageTypeSlug` on their own origin because "a browser cannot reach the page query service". That module's line 1 imports `askComposed` from `@shared/pages-query/ask`, and `alanwalton/web/app/routes/api.pages.$pageTypeSlug.ts:8-10` routes to it through `answerPages`. So the answer built to avoid the dead service is itself a server-side read that dials it. Not measured live.

**Breadth.** Files under each deployed app's `app/` naming `@shared/pages-query`: `alanwalton/web` 23, `temper/web` 6, `audhdalan/web` 1, `archive-of-worlds/web` 1, `smilingjenny/web` 1, `alanwalton/atlas-web` 1 — 33 across six apps. Which of them throw and which swallow is not classified here; only the two above were read.

**Referred, not missed.** The `Service` and the `EndpointSlice` in `page-query-service` are cluster objects and their removal was referred to the seat holding the cluster domain rather than taken here. Nothing in this reading touched either.
