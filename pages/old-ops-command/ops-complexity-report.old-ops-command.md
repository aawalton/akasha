---
id: 8dca9060-b35a-571d-8dc6-32cf1d568dae
page-type-slug: old-ops-command
title: "Ops complexity report"
slug: ops-complexity-report
domain-parent-slug: domain/ops-complexity
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/complexity/report.ts
path: complexity report
---

# Definition

- **Ops complexity report** — every metric by percentile over the whole checkout, with each one's top outliers beside it.

# Help

Workspace-wide complexity roll-up: per-metric percentile distributions plus
the top-n outliers per metric.

Computes percentiles p50, p75, p90, p95, p99, and max for each of:
  • cyclomatic complexity (per-function distribution)
  • Halstead Volume       (per-function distribution)
  • Maintainability Index (per-file distribution; lower = worse, so the
    'top outliers' for MI are the lowest values)

Default stdout (TSV): three sections, each with percentile rows then a
blank line and a top-n outliers block.

--json stdout: { cyclomatic: { p50, p75, p90, p95, p99, max, top: [...] },
                  halstead:   { ... },
                  maintainability: { ... } }

Percentiles are reported because complexity follows a power-law
distribution and arithmetic averages hide the outliers that drive
actual maintenance cost.

This command always exits 0 — it reports metrics, not violations.
