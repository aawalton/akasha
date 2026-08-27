---
id: ca5dda90-aaf2-5d1e-9942-f826be378b2e
page-type-slug: old-ops-command
title: "Ops complexity cyclomatic"
slug: ops-complexity-cyclomatic
domain-parent-slug: domain/ops-complexity
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/complexity/cyclomatic.ts
path: complexity cyclomatic
---

# Definition

- **Ops complexity cyclomatic** — the McCabe cyclomatic complexity of every function in the checkout's TypeScript, highest first.

# Help

Per-function McCabe cyclomatic complexity across the workspace TypeScript files.

CC = 1 + |decision points|. Decision points: if, case (not default), for/for-in/for-of,
while, do-while, catch, ternary ?:, each binary && / || / ??, each ?.
Not counted: else, finally.

Default stdout (TSV): file<TAB>function<TAB>line<TAB>cc, one row per function.
--json stdout: { rows: [{ file, function, line, cc }, ...] }

This command always exits 0 — it reports metrics, not violations.
