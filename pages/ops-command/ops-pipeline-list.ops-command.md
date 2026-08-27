---
id: ff0227b6-a34c-579e-b120-956ed21aa9b2
page-type-slug: ops-command
title: "Ops pipeline list"
slug: ops-pipeline-list
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/pipeline/list.ts
path: pipeline list
---

# Definition

- **Ops pipeline list** — recent pipelines newest first, each with its branch, commit, age and what superseded it.

# Help

List recent pipelines, optionally filtered by branch or status. Ordered newest-first by createdAt. Age column is derived from the row's createdAt.

Default stdout: one TSV row per pipeline — `<seq>\t<status>\t<branch>\t<sha7>\t<age>\t<supersededBy>\n`. Empty result → empty stdout, exit 0.
--json stdout: `[...]` array of `{ seq, status, branch, commitSha, shortSha, createdAt, updatedAt, supersededBy }` on a single line. `commitSha` is the full 40-char SHA; `shortSha` is the canonical 7-char display form derived from it.
