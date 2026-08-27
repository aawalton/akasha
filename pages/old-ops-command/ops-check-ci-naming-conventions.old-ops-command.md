---
id: 45bcf29b-d956-5c3f-822c-204c974b2295
page-type-slug: old-ops-command
title: "Ops check-ci-naming-conventions"
slug: ops-check-ci-naming-conventions
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-ci-naming-conventions.ts
path: check-ci-naming-conventions
---

# Definition

- **Ops check-ci-naming-conventions** — ruling on the shape of every CI workflow and step name, and whether a step name fits a pod name.

# Design

The cap on a step name is found by running the pod-name composer rather than stated here.

The cap falls as the pipeline sequence grows, and outside a pipeline the tightest one is assumed.

An apps workflow states a package and no other kind does, and both directions are refused.

Nothing here reads a source tree. The workflow surface is all it sees.

# Help

Read every `workflow-template` page as one workflow surface and rule on the names in it.

What it refuses: a workflow or step name outside `[a-z][a-z0-9-]*`; a workflow name restating its own kind; an apps workflow with no `package` and any other kind with one; a page whose slug is not `workflow-` followed by the workflow it declares; a step name not starting with its workflow's name; and a step name longer than a pod name will carry whole.

The step-name cap is not stated here. It is found by running `buildPodName` — the same function the pod dispatcher runs — on names of falling length until one comes back whole, so a change to how a pod name is composed moves the cap with it rather than leaving this check quoting a number nothing keeps true.

Exit codes:
  0  every name examined, nothing refused
  1  a name is wrong
  2  the surface did not come up, so nothing was ruled on
