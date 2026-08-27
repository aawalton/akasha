---
id: 5e6369ce-fde2-5497-92b3-bad038fac84c
page-type-slug: finding
title: "Force keep lock hand listed"
domain-slug: domain/global
---

# Claim

The lock holding the whole-repo check scanners force-kept enumerates them by hand, and most of the force-kept scanners are not in it.

# Evidence

`packages/infra/checks/src/lib/whole-repo-scanner-branch-gate.unit.test.ts` holds `WHOLE_REPO_SCANNER_STEPS`, a hand-written list of the steps whose `alwaysRun` it asserts. Its own header states what the flag buys: without the force-keep, the step-level selection filter drops a whole-tree scanner when the closure seeding it misses the file that carried the violation, so the branch goes green and the scanner reds at the merge queue against staging's cumulative diff against main.

The list names seven steps: `check-tsconfig`, `check-phantom-deps`, `check-syntax-bundle`, `check-no-orphan-source`, `check-ast-grep`, `check-guard-reach` and `check-predicate-derivation`.

`check-configs-verification-surface.ts` alone registers eight entries carrying `alwaysRun: true`. Three are on the list — `no-orphan-source`, `guard-reach`, `predicate-derivation`. Five are not: `env-unset-bash`, `lint-scope-coverage`, `carrier-coverage`, `emitted-path-citations` and `git-guard-both-forms`, whose registration project #18477 moved to `alwaysRun` because its population now includes `.sh` and `.bash` files that seed no graph node. Each of the five carries a comment in the registry stating the force-keep is required for correctness, and for each, an edit dropping the flag reopens the gap the lock exists to hold and reds nothing.

The list and a derivation over the registry agree on every member that stands in both, so the staleness fails nothing and the seven passing assertions read as coverage of the class.
