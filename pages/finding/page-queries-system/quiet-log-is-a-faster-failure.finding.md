---
page-type-slug: finding
slug: quiet-log-is-a-faster-failure
title: "The web app's page-query log went clean when the service name stopped resolving, not when the read started working"
domain-slug: domain/page-queries-system
---

# Claim

`alanwalton/web`'s server-side page-query failures stopped appearing in the pod log at `2026-08-28T05:06:28.536Z` because the origin's DNS name stopped resolving, not because the read started working: the app still installs no fetcher, still states no `PAGE_QUERY_ORIGIN`, and still dials the deleted `page-query-service` on every server-side read.

# Evidence

Read and run on 2026-08-28 against `bccf33790` on `main`; cluster readings from object state and pod logs, with no production endpoint called.

`kubectl -n alanwalton logs web-874d9684f-jcxg6 -c web --tail=100000 --timestamps` gives 49,822 lines from `2026-08-26T00:36:48.540Z` to `2026-08-28T07:50:03.093Z`. 155 of them name `page-query-service`, and the last stands at `2026-08-28T05:06:28.536Z`; the log runs clean for the two hours and forty-three minutes after it.

Nothing in the repository changed across that boundary. `alanwalton/web` installs no fetcher into `@shared/pages-query` and states no `PAGE_QUERY_ORIGIN`, so `pageQueryOrigin()` returns the deleted service's address on every server-side read.

What changed is beneath it. `getent hosts page-query-service.page-query-service.svc.cluster.local` now answers nothing at all, where it once resolved to `10.100.134.88`. So the read fails on connect rather than timing out at 5000ms, and the failure no longer reaches the log by the same route.

Not measured: which of the two failure modes, if either, the callers distinguish; and whether the name was removed deliberately or fell out with the service.
