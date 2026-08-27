---
id: 89841a54-ef20-50d3-aa95-90543f2c1d50
page-type-slug: old-ops-command
title: "Ops pipeline show"
slug: ops-pipeline-show
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/pipeline/show.ts
path: pipeline show
---

# Definition

- **Ops pipeline show** — one pipeline's own fields, how many of its workflows sit at each status, and what waits on a node.

# Help

Fetch one pipeline by its seq number and render its header fields plus a per-status workflow summary.
`seq` is allocated per page type, not globally — the same number names a different row in each type, so a project seq and a pipeline seq are unrelated numbers that happen to look alike.

Default stdout: human-readable `<key>\t<value>` lines — `seq`, `status`, `branch`, `commitSha`, `createdAt`, `updatedAt`, `supersededBy` (if set), then one `workflow.<status>\t<count>` line per status present, and — only when a step is queued on node capacity — `capacityWait.waiting\t<n>` / `capacityWait.nodes\t<csv>` (a capacity queue, not a wedge; #15574).
--json stdout: compact single-line `{ pipeline, workflows: { total, byStatus }, capacityWait: { waiting, nodes } }` — stable shape.
