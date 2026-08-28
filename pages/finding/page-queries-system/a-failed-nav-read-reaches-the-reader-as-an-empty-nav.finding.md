---
page-type-slug: finding
slug: a-failed-nav-read-reaches-the-reader-as-an-empty-nav
title: "The app layout swallows a failed page read into the same null it uses for a true empty, and shows a signed-in reader an empty navigation"
domain-slug: domain/page-queries-system
---

# Claim

Two modules in one deployed app make the same page read and disagree about what a failure is. `home-dni.server.ts` throws, and the page errors. `_app-layout.tsx` catches, writes a line to the pod's stderr, and hands the route `navItems: null` — the same shape it would hand back if the reader genuinely had no navigation. A signed-in reader is shown an app with an empty navigation and told nothing went wrong.

The swallow is on the layout, which wraps five routes to the other's one, so the silent behaviour is the common one and the loud behaviour is the exception.

It has been exercised, three times. A window covering the pod's whole life rather than one night — 49,822 lines from `2026-08-26T00:36:48.540Z` to `2026-08-28T07:50:03.093Z` — carries three `nav SSR fetch failed` lines, at `2026-08-27T17:56:49.129Z`, `17:56:57.851Z` and `23:54:00.524Z`. So at least three signed-in page loads have already rendered with an empty navigation and told the reader nothing. The first reading's four-hour-fifty-seven-minute window held none of the three, which is why it read as untested; the defect is the same either way, and it is a fault that has happened rather than one waiting to.

# Evidence

Read and run on 2026-08-28 against `bccf33790` on `main`. Cluster readings are from the deployment side — object state and pod logs. No production endpoint was called.

**The two behaviours, on the same read.** `alanwalton/web/app/lib/home-dni.server.ts:19-25` calls `askComposed` with no fetcher and at `:26-28` does `throw new Error(\`\`${NAV_SLUG}\` slugged "${HOME_NAV_SLUG}" went unread: ${asked.why}\`)`. It is reached from the `loader` at `alanwalton/web/app/routes/home.tsx:13-19`, line `:17`. `alanwalton/web/app/routes/_app-layout.tsx:12-31` makes a near-identical `askComposed` over `page-type: "nav"`, and at `:25-27` catches, calls `console.error("[alanwalton/web/_app-layout] nav SSR fetch failed:", err)`, and falls through to `:31`, returning `data({ user: userEnvelope, navItems })` with `navItems` still at its `:16` initial value of `null`.

**`null` is the same word the layout uses for a true empty.** `navItems` is declared `ReadonlyArray<Record<string, unknown>> | null = null` at `:16` and is only ever assigned from `asked.answer.rows` at `:24`. It is passed to `AppShell` as `ssrNavItems`. So a failed read and a reader with no navigation arrive at the component as the same value, and the component has nothing to tell them apart with.

**The silent path is the wide one.** `alanwalton/web/app/routes.ts:4-10` puts five routes under that layout — `home`, `principles`, `design`, `:pageTypeSlug/:pageHrefParam`, `:pageTypeSlug`. `home-dni.server.ts`, the throwing one, is reached from exactly one of them. Every `api/*` route in the file, and the landing, sign-in and readout routes, sit outside the layout entirely.

**Why one window showed the swallow zero times and a wider one shows three.** `kubectl -n alanwalton logs web-874d9684f-jcxg6 -c web --tail=4000 --timestamps` spans `2026-08-28T02:53:42.209Z` to `2026-08-28T07:50:03.093Z`, four hours and fifty-seven minutes. Counted over it: 31 lines of `device-secrets lookup failed: … went unasked: http://page-query-service…`, 258 of `The render was aborted by the server without a reason`, and **0** of `nav SSR fetch failed`. Taken at `--tail=100000`, the same pod gives 49,822 lines from `2026-08-26T00:36:48.540Z`, and over that: **155** lines naming `page-query-service` and **3** of `nav SSR fetch failed`. The three sit at 17:56 and 23:54 on the 27th, hours before the narrow window opens.

So the swallow is roughly fifty times rarer than the throw, which is what the route counts predict in the other direction and is worth holding onto: the wide silent path fires seldom because it needs a signed-in request, and the narrow loud path fires constantly because it does not. The device-secret failures come from `resolveDeviceSecretContext` → `guardReadout` → `loader$30`, a route outside the layout. The layout's own read is inside `if (user)` at `_app-layout.tsx:17`, so it runs only for a signed-in request to one of its five routes. Still not measured: the app logs no requests, so how many arrived cannot be counted.

**The throwing route stopped failing without anything being repaired.** The last of the 155 stands at `2026-08-28T05:06:28.536Z`, and the log runs clean for two hours and forty-three minutes after it. Nothing in the repo changed: `alanwalton/web` still installs no fetcher and states no origin. What changed is beneath it — `getent hosts page-query-service.page-query-service.svc.cluster.local` now answers nothing at all, where it once resolved to `10.100.134.88`, so the read fails on connect instead of timing out at 5000ms. A quiet log here is a faster failure, not a working read.

**So the failure the layout swallows has not happened yet in production, and will.** Nothing about the origin has changed: `alanwalton/web` installs no fetcher, states no `PAGE_QUERY_ORIGIN`, and `pageQueryOrigin()` returns the deleted service's address on every server-side read. The next signed-in load of `/home`, `/principles`, `/design` or any page-type route runs `:19-24`, fails, and renders with an empty navigation and a stderr line no reader sees.

This is Answer Or Refuse on `pages/domain/pages-system.domain.md:34-42` — "A true empty and a failure read alike, and only one of them is a fault", and "Never read a missing source as an empty one" — broken in the surface a person actually looks at rather than in a library. `pages/finding/page-queries-system/five-callers-still-dial-the-dead-loopback.finding.md:11` recorded the same shape across five loopback callers and named the editor extension as "the behaviour the other four should have"; this is the same defect on the cluster origin, in a route a person loads.

Not judged here: what the repair should be. Whether the layout should throw as `home-dni.server.ts` does, refuse into a visible banner, or carry a third state distinguishing "unread" from "none", changes what a signed-in reader sees, and that is a call for a person rather than a reading.
