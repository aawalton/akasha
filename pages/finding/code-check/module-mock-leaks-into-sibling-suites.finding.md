---
id: 8e5a063b-d245-58e2-87c8-4e2cacb95b3c
page-type-slug: finding
title: "Module mock leaks into sibling suites"
domain-slug: domain/global
---

# Claim

A `mock.module` in `finish.unit.test.ts` leaks into sibling suites in the same bun process, and CI cannot see it because those suites skip there.

# Evidence

REPRODUCED ON A CLEAN MAIN CHECKOUT, not on a branch. `ops worktree ephemeral -- bun test src/project/finish.unit.test.ts src/project` in `packages/alanwalton/projects/cli`, measured at `a9a3c5fbb0364ab4bf3523604881323bf0788b23` (origin/main): 468 tests across 52 files, 464 pass, 4 fail. No uncommitted change and nothing from any branch was present.

The four are two cases each in `obligation-gate.database.test.ts` and `obligations-write-boundary.integration.test.ts`, all failing with `TypeError: sb.rpc is not a function` at `packages/shared/pages/access/src/delete.ts:121:36`, reached through `cleanupFixtures`.

WHAT COUPLES THEM. `src/project/finish.unit.test.ts:71` registers a process-global `mock.module("@shared/supabase-server", ...)`. `mock.module` is not scoped to the file that calls it, so every suite loaded into the same bun process afterwards receives the stub, and the two suites above then call a real client method the stub does not carry. Which files share a process depends on how the run is grouped, so the failure appears and disappears with the argument list rather than with the code: `bun test src/project/census.unit.test.ts src/owner src/pure` is green over 844 tests, and adding `src/project` turns four red.

WHY NEITHER LANE REPORTS IT. Both affected suites are `describe.skipIf(!haveLiveInfra)`. CI has no live infrastructure, so both skip and the leak has nothing to land on. It is reachable only where live infrastructure IS present, which is the workstation — so the lane is green exactly where the defect cannot fire, and red exactly where nobody is gating.

WHAT WAS NOT MEASURED. Whether other files register process-global module mocks with the same reach, and whether any suite that does NOT skip in CI is already receiving one. Both need a sweep over the `mock.module` call sites rather than a run, which is where this finding stops.
