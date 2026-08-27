---
id: db919827-e959-5ecd-95e3-6d89a89d8b60
page-type-slug: finding
title: "The arrival package is dead behind the boot digest"
domain-slug: domain/unused-code
---

# Claim

`packages/alanwalton/health-samples/arrival` has no reader left. Its whole public surface was reached only by `digest-contributor-stream-arrivals.ts`, which #19376 removed, and nothing anywhere reaches it now. It was left standing because taking it is a package removal rather than a file removal, which #19376 was not scoped for.

# Evidence

Measured 2026-08-17 in the #19357 worktree at `e0042ec`, after #19376 removed the boot digest cluster.

`check-ast-unused` names all four of its `index.ts` re-exports — `describeSilentStream`, `STREAM_ARRIVAL_GRACE_HOURS`, `STREAM_ARRIVAL_LOOKBACK_DAYS`, `streamArrivalAt` — as reached from no entry. Each was searched by name across the code, instructions, memory, books and stories repositories: outside the package's own `src/`, there are zero references to any of them.

The package holds three files: `arrival-freshness.ts`, its unit test, and the `index.ts` that re-exports it. Removing it terminates rather than cascading — `arrival-freshness.ts` imports only `getEsoDayStr` and `getEsoDayWindow` from `@shared/recurrence/reset-times`, which stands on its own reaches.

It is not only files. `packages/alanwalton/personas/cli/tsconfig.json:23` carries `{ "path": "../../health-samples/arrival" }`, so the reference comes out with the package, and whatever else workspace membership touches comes with it.

Not measured here: whether anything outside the five repositories searched reaches it, what else names the package beyond that one tsconfig reference, or whether the health-samples tree has a reason to keep an empty member. Its sibling packages under `health-samples/` were not examined at all.
