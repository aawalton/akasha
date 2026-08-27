---
id: b783fe70-35e7-50eb-a4bd-8520a12026e9
page-type-slug: ops-command
title: "Ops complexity halstead"
slug: ops-complexity-halstead
domain-parent-slug: domain/ops-complexity
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/complexity/halstead.ts
path: complexity halstead
---

# Definition

- **Ops complexity halstead** — the Halstead token counts and the figures derived from them, per function, largest volume first.

# Help

Per-function Halstead metrics across the workspace TypeScript files.

Computes η₁/η₂/N₁/N₂ from each function's body tokens (operator/operand
classification table in @infra/analysis-complexity-core/operator-classification.ts)
and reports derived Volume, Difficulty, Effort, Time, and predicted Bugs.
Type annotations and comments are excluded from token counts.

Default stdout (TSV): file<TAB>function<TAB>line<TAB>n1<TAB>n2<TAB>N1<TAB>N2<TAB>volume<TAB>difficulty<TAB>effort<TAB>time<TAB>bugs
--json stdout: { rows: [{ file, function, line, n1, n2, N1, N2, volume, difficulty, effort, time, bugs }, ...] }

This command always exits 0 — it reports metrics, not violations.
