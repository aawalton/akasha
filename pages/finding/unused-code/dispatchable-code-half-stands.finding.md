---
id: a53a4fc8-3036-58e0-b510-0eaf51961e9b
slug: dispatchable-code-half-stands
page-type-slug: finding
title: "A retired flag's whole code half still stands, and the ast-unused check cannot see that it is dead"
domain-slug: domain/unused-code
---

# Claim

The `--dispatchable` flag was retired from `ops project list` while its whole code half still stands in the code repository, and `check-ast-unused` cannot see that it is dead.

# Evidence

Measured 2026-08-17 in the #19388 worktree at `eda1610718`, off `main`.

`ops project list --help` lists sixteen flags and `--dispatchable` is not among them. `tools/commands/project/` in the instructions repository holds zero references to the word: `grep -rln dispatchable tools/commands/project/` returns nothing. So no live command path reaches the flag.

The code repository still carries its implementation. `packages/alanwalton/projects/cli/src/project/dispatchable-filter.ts` stands, along with `dispatchable-filter.unit.test.ts`, `list-args.ts`, `list-count.ts`, `decide-list-flag-coherence.ts` and its test, and `dispatch-predicates.unit.test.ts` — ten tracked files name it outside `dist/`.

`check-ast-unused` reports none of them. It flagged only `DispatchGateTerm` and `DISPATCH_GATE_TERMS` on `dispatch-predicates.ts`, which #19388 removed, because those two were reached from the instructions repository and nothing else. The rest of the cluster imports itself: `dispatchable-filter.ts` imports from `dispatch-predicates.ts`, `list-count.ts` imports `isProjectUnblocked`, and the unit tests import all of them. A module reached only through another code-repo module is the second of the three blind spots recorded at `pages/finding/agent-harness/cross-repo-reach-invisible-to-importer-sweep.finding.md`, and it is the one that finding says has no published answer.

So the shape here is: an instructions-repo retirement severs the one edge the check can see, the check reports the two symbols on that edge, and a whole cluster behind them goes on standing with nothing reporting it.

Not measured here: whether anything outside `ops project list` reaches `dispatchable-filter.ts`; whether the flag was retired deliberately or is mid-move; which commit in the instructions repository removed it; whether `list-args.ts` and `list-count.ts` carry live non-dispatchable duties that keep them regardless, which on reading they appear to. The cluster is named as a candidate, not as dead.
