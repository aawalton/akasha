---
id: 200c992f-5b28-5ea1-b4cb-dc3587a4e9db
slug: typecheck-gate-blind-to-classic-tsc
page-type-slug: finding
title: "Typecheck gate blind to classic tsc"
domain-slug: domain/global
---

# Claim

The pipeline typechecks with tsgo and never runs classic `tsc`, so a disagreement between the two compilers is invisible to CI and visible only to a seat at a terminal. It cost four seats under #18484 part of a stage each, and cost me a wrong instruction to eighty children — I told them the red was gone, having measured three of the four things I asserted.

# Evidence

Inside `packages/infra/checks`, `bunx tsc -b` exits 2 on two errors in REFERENCED projects while `bunx @typescript/native-preview -b` exits 0 over the same package:

```
../../shared/worker-runtime/src/test-helpers.ts(175,5): error TS2322
../ci/worker/src/reactors/branch-event-reactor.ts(314,5): error TS2322
    Type 'Promise<void>' is not assignable to type 'Promise<EventsHandlerSkip | undefined>'
```

`check-configs.ts:221` builds the CI step as `cd <workspace> && bunx @typescript/native-preview -b`, and all 366 package `typecheck` scripts plus the root one invoke tsgo. Nothing in the repository invokes a bare `tsc` — I searched every `.json`, `.sh` and `.ts`, and the two live hits, `infra/git/cli/src/lib/sync.ts:180` and `worktree-ops.ts:214`, both run `bunx @typescript/native-preview -b` and only *say* `tsc -b failed` in their warning text. So the divergence is reachable only by a command this repository does not define.

**THERE IS NO SEAM DEFECT, and an earlier version of this finding said there was.** #18726 measured it and I reproduced the measurement independently, in four lines outside this repository, naming neither handler and no `EventsSubscriberHandler`:

```ts
type Skip = { skip: true }
type Handler = () => Promise<Skip | undefined>
const h: Handler = async () => { /* falls off the end */ }
```

`tsc` 5.9.3 gives exactly that TS2322 chain; tsgo exits 0. A contextually-typed function falling off the end, where the target return type admits `undefined`, is simply permitted by one compiler and refused by the other. Repairing the five sites in the repo would silence today's instances of something nothing gates, and `events-types.ts` records 82 sites satisfying that type structurally, so it returns with the next handler that never skips.

**What is actually open is which compiler should govern**, which is a toolchain decision rather than a reading of any code. Anyone sent to "fix the seam" is being sent after a defect that is not there.
