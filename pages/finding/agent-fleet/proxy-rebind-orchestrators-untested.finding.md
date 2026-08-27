---
id: c2174464-e4a4-5298-9ccf-38043f414c28
page-type-slug: finding
title: "Proxy rebind orchestrators untested"
domain-slug: domain/agent-fleet
---

# Claim

Every rebind and retry orchestrator in the OAuth proxy is untested. `attemptServerOverloadRetry`, `attemptModelUnavailableRebind` and `attemptPermissionDeniedRebind` appear in no `.test.ts` file, while each of their pure classifiers is tested thoroughly — which is what makes the gap read as covered. The Alan-confirmed invariant that a server-overload must never mark a healthy account at-limit is held by a comment and by branch order alone.

# Evidence

Measured in `~/code` on 2026-08-07 while emptying the quarantined `529-overload-rebind` document. Symbols resolved against tracked files only, by iterating `git ls-files "packages/agents/**/*.ts"` and grepping each path: a bare `rg` skips ignored files and `dist/` supplies stale hits.

`attemptServerOverloadRetry` appears in two files — its module `oauth-proxy/src/server-overload-retry.ts` and its call site `pick-pipeline.ts`. `attemptModelUnavailableRebind` and `attemptPermissionDeniedRebind` appear in three each: their modules, `pick-pipeline.ts`, and one sibling docblock. No `.test.ts` names any of them.

The pure layer is tested, which is the shape of the gap. `server-overload.unit.test.ts` pins the classifier (529 on status alone even with an empty body; a 429 only on `overloaded_error`; 200/403/404/500 never) and `serverOverloadBackoffMs` (schedule, clamp, honoured `Retry-After`, the `MAX_RETRY_AFTER_MS` cap, ignored HTTP-date, zero/negative/empty). A reader checking coverage finds a thorough suite and stops.

The only test driving the pipeline is `pick-pipeline-capacity.unit.test.ts`, and every response it scripts is a 429 carrying `RATE_LIMIT_BODY` or an overage/capacity header set — no 529, no `overloaded_error` 429, no 403, no 404. Those 429s do enter `attemptServerOverloadRetry`, the gate at `pick-pipeline.ts:171` being `status === 429 || status === 529`, so its non-matching arm runs incidentally. Untouched: the retry loop, the backoff sleep, the exhaustion passthrough, and the return-before-the-mark-path the invariant rests on.

It is held by prose. `server-overload-retry.ts:127` reads "never marking the account (Alan-confirmed: the account is healthy, the server is busy)", beside a comment at `pick-pipeline.ts:171`. A refactor letting the matched arm fall through to the account-cap branch passes every test in the package, and its symptom — healthy accounts forced to 100/100 — shows only during an upstream outage.

`rg -l -i "server-overload|529"` over `findings/` returns one file, matching only on "27,529 bytes".
