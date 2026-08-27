---
id: 92994dba-2942-5e8e-a8dc-b44ad685536e
page-type-slug: ops-command
title: "Ops ali fold"
slug: ops-ali-fold
domain-parent-slug: domain/ops-ali
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/ali/fold.ts
path: ali fold
irreversible: true
---

# Definition

- **Ops ali fold** — computed mastery refolded over the whole Book of Everything, into every node and the dashboard.

# Help

Deterministic coverage fold over the on-disk Book tree: read every node's direct mastery D, fold computed mastery C bottom-up, write each node's freshly-computed C back into its profile.md front-matter, and regenerate DASHBOARD.md. Walks the actual directory tree rather than the seed outline, so just-in-time expansions below the section level fold in automatically. REWRITES EVERY profile.md IN THE BOOKS REPO: only the C: line of each is touched, but the write is across the whole tree. This is the C axis, not the coverage axis — `ops ali coverage` is the audit-phase scoreboard.
