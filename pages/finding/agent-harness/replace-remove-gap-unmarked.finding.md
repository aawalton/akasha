---
id: b8445b52-8747-51d3-b3a9-ef1044d47970
page-type-slug: finding
title: "Replace remove gap unmarked"
domain-slug: domain/agent-harness
---

# Claim

Replace Before Removing fixes the order of the two acts and says nothing about the gap between them, and that gap turns the code repository red for every branch until the removal lands.

# Evidence

Twice on 2026-08-14 a correct instructions-side landing left the code repository red fleet-wide until its paired removal caught up. In both the rule was obeyed: the replacement landed first, deliberately.

FIRST. The instructions repository moved its command declarations under `tools/commands/**`, while `commandsDeclared()` in `packages/agents/instructions/src/instructions/command-set.ts` still read `tools/` flat and non-recursively. `check-cli-help-flag-references` failed with "declares no commands under tools/" on every branch that ran it, from about 08:00 UTC until #19011 landed at `2591f2539e` — about five and a half hours. Verified on the workstation against the live tree, exit 2, and on pipelines of three unrelated branches.

SECOND, beginning before the first cleared. Instructions commit `955fc870a` at 13:59 UTC pointed `tools/commands/seat/halt-census.ts` at `../../lib/halt-census.ts`, the last reach into the code-side copy. `check-ast-unused` now reports exactly one violation on main — `packages/agents/cli/src/agent/halt-census.ts:317, not reached from any entry` — over 1356 analysis inputs, so it crossed the boundary and the finding is true. One violation, and it is every branch's red.

WHO PAYS. The seat that landed the replacement is finished and gone. The cost falls on every later seat holding a branch that triggers CI, none of which caused it, each spending a turn establishing the red is not theirs and each then correctly told not to repair what it did not touch.

A SIBLING, NOT A DUPLICATE. Dalla holds the opposite face on code-harness: a code-first change is measured against instructions main, so its branch is never green and main never notices. Same root, opposite cost, different repair — fixing either leaves the other standing.

NOTHING MARKS THE DEBT WHEN IT IS INCURRED. The replacement lands on a commit, green in its own repository, and the instructions checks pass throughout. What is owed shows only when a later unrelated branch runs the code repository's checks.
