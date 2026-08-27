---
id: fa21afc4-e9f1-5835-a59c-6a4b44805e62
page-type-slug: old-ops-command
title: "Ops check-ci-workflow-graph"
slug: ops-check-ci-workflow-graph
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-ci-workflow-graph.ts
path: check-ci-workflow-graph
---

# Definition

- **Ops check-ci-workflow-graph** — ruling on whether every CI workflow and step waits on something declared, and in one direction.

# Design

A disabled workflow is ruled on exactly as a live one is.

A live workflow waiting on a disabled one is refused.

A workflow's kind is the one its page states; the one its declaration states is compared against it and used for nothing else.

Nothing here reads a source tree. The workflow surface is all it sees.

# Help

Read every `workflow-template` page as one workflow surface and rule on the graph it forms.

What it refuses: a workflow whose kind requires it to wait for `preparation` and does not; a `when.branch` its kind does not allow; a declared `kind` the page disagrees with; two workflows or two sibling steps carrying one name; a `dependsOn` naming a workflow that is not declared, naming a checks workflow from an apps one, or naming a disabled workflow from a live one; a step `dependsOn` naming no sibling; and a ring of workflows, or of steps inside one workflow, waiting on each other.

A disabled workflow is examined exactly like a live one. It is still in the tree, it is re-enabled by deleting one line, and its edges rot while nothing looks at them — so the moment it comes back is the worst moment to find out.

Exit codes:
  0  every workflow examined, nothing refused
  1  the graph is faulty
  2  the surface did not come up, so nothing was ruled on
