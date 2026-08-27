---
id: 37f15b68-045f-5183-a417-10926bdb3584
page-type-slug: old-ops-command
title: "Ops complexity maintainability"
slug: ops-complexity-maintainability
domain-parent-slug: domain/ops-complexity
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/complexity/maintainability.ts
path: complexity maintainability
---

# Definition

- **Ops complexity maintainability** — the Maintainability Index of each of the checkout's TypeScript files, lowest first.

# Help

Per-file Maintainability Index (Visual Studio variant) across the workspace.

MI = max(0, 100 · (171 − 5.2·ln(V) − 0.23·G − 16.2·ln(L)) / 171)
where V = sum of function-level Halstead Volumes, G = sum of function-level
cyclomatic complexities, and L = SLOC (blank/comment-only lines excluded).

Caveat: SLOC sensitivity. Splitting a function into two without changing
its decision points or token vocabulary increases MI for each resulting
file. This is a property of the formula, not a bug — MI is a heuristic
rather than a structural metric.

Default stdout (TSV): file<TAB>mi<TAB>sloc<TAB>cc_sum<TAB>volume_sum, one row per file.
--json stdout: { rows: [{ file, mi, sloc, ccSum, volumeSum }, ...] }

This command always exits 0 — it reports metrics, not violations.
