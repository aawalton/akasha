---
id: e785a544-b94e-5a41-a1a4-644f95c573c2
slug: tsc-named-where-tsgo-runs
page-type-slug: finding
title: "Tsc named where tsgo runs"
domain-slug: domain/global
---

# Claim

Nothing in this repository runs classic `tsc`, but several live sites still call the tool by that name — two of them in warning text a person reads when a build fails. A reader told `tsc -b failed` goes looking at classic `tsc`, which is a different compiler that disagrees with the one that actually ran. That confusion has already cost seats part of a stage each.

# Evidence

Every `typecheck` script in the repository — 366 packages plus the root — invokes `bunx @typescript/native-preview` (tsgo), and no script, config or shell file invokes a bare `tsc`. I searched every `.json`, `.sh` and `.ts` outside `node_modules`.

Two of those hits are live code paths whose warning text names the wrong tool:

- `packages/infra/git/cli/src/lib/sync.ts:180` runs `runCmd(["bunx", "@typescript/native-preview", "-b"], root)` and reports failure as ``tsc -b failed (non-blocking): …``
- `packages/infra/ci/orchestrator`-adjacent `packages/infra/git/cli/src/lib/worktree-ops.ts:214` does the same

So `ops project sync` and worktree creation both tell their reader that `tsc -b` failed when what ran was tsgo. Under Ubiquitous Naming that is a second spelling for one concept, and here the second spelling is the name of a *different compiler that is also installed and that disagrees with this one on this tree*.

**The confusion is not hypothetical.** Four seats under tree #18484 each spent part of a stage deciding whether a classic-`tsc` exit 2 was their own work, and I repeated the mistake at the top of tree #18682 by telling eighty children a red was cleared when I had measured three of the four things I asserted. `pages/finding/code-harness/typecheck-gate-blind-to-classic-tsc.finding.md` holds that measurement.

The repair is small — say `typecheck` or name tsgo in both messages — and it is worth having precisely because the wrong name here points at something real and wrong rather than at nothing.
