---
id: 3e8fc860-aeb5-5d21-9ab4-afdf488a4380
page-type-slug: finding
title: "Subscriber handlers do not typecheck on main"
domain-slug: repo/code-repo
---

# Claim

`EventsSubscriberHandler` on main requires a return of `Promise<EventsHandlerSkip | undefined>`, and five of its live implementations plus the runtime's own test helper still return `Promise<void>`, so `tsc -b` fails on packages nobody has changed.

# Evidence

Measured 2026-08-03 from `/home/walton/code` at commit `39bcea203c`.

`git show HEAD:packages/shared/worker-runtime/src/events-types.ts` line 81 declares the handler returning `Promise<EventsHandlerSkip | undefined>`.

`bunx tsc -b packages/alanwalton/daily-tracking-cli packages/alanwalton/daily-tracking-worker` exits 2 with six TS2322 errors, every one reading `Type 'Promise<void>' is not assignable to type 'Promise<EventsHandlerSkip | undefined>'`: `worker-runtime/src/test-helpers.ts(175,5)`, and under `daily-tracking-worker/src`, `health-task-subscriber.ts(141,5)`, `hourly-confirm-subscriber.ts(487,5)`, `relationship-session-subscriber.ts(227,5)`, `sleep-session-subscriber.ts(174,5)` and `strength-session-subscriber.ts(134,5)`.

Four of the six are untouched by the working tree and by the commit measured from — `git diff --stat` over `packages/shared/worker-runtime` and `health-task-subscriber.ts` is empty — so the failure stands on main. The type's own docblock two lines above `EventsHandlerSkip` reads "across packages this change did not scope".

Unit tests over the same two packages pass: 239 tests, 0 failures. Nothing in the test lane reports this.

Two limits on that. The compile was scoped to those two packages, so six is a floor and other packages were not searched. And a clean-checkout compile was not obtainable — `bun ops worktree ephemeral` exits 3 while the repo carries about twenty uncommitted deletions under `packages/agents/instructions/src/lib/findings-*` belonging to another agent — so pre-existence rests on the git-diff reading rather than on a compile of an unmodified tree.
