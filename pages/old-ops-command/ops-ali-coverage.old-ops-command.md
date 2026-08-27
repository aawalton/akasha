---
id: b73fb374-7353-5c5b-8ab7-8d21cb5dc5e7
page-type-slug: old-ops-command
title: "Ops ali coverage"
slug: ops-ali-coverage
domain-parent-slug: domain/ops-ali
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/ali/coverage.ts
path: ali coverage
---

# Definition

- **Ops ali coverage** — what share of the Book of Everything has been opened at all, against sections and against nodes.

# Help

Measurement coverage for the Book of Everything's audit phase: the fraction of the tree ASSESSED AT ALL, keyed off status != "unopened" (NOT off D — a node measured at D=0 'Novice' is measured; only never-opened nodes are unmeasured, so coverage can honestly reach 100%). Surfaces BOTH denominators: a STABLE section headline (measured sections / 177 canonical sections, monotonic-up as sections open) and a LIVE materialized detail (measured nodes / all materialized nodes, allowed non-monotonic because just-in-time expansion adds fresh unopened nodes). Reports root percentages plus a per-Part and per-Division breakdown. This is the right scoreboard for the audit phase; C (computed mastery) is not.
