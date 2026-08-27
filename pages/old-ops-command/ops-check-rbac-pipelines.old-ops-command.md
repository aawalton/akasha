---
id: 96042982-48b0-5823-87af-ea334c2a3f8b
page-type-slug: old-ops-command
title: "Ops check-rbac-pipelines"
slug: ops-check-rbac-pipelines
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-rbac-pipelines.ts
path: check-rbac-pipelines
---

# Definition

- **Ops check-rbac-pipelines** — ruling that the engine holds a permission for every kubectl command its steps run.

# Design

A kind the parser does not model is refused rather than skipped.

Only a step declaring `serviceAccountName: pipeline-engine` is read.

A step reaching `deploy-functions.sh` is counted and not judged.

Full step declarations are loaded rather than a resolved workflow surface, because whose account a step runs under is not on the surface.

# Help

Compose every `workflow-template` page over the code tree, read the kubectl commands each `pipeline-engine` step would run, and rule that the RBAC covers each one.

Two things are refused. A command asking for a (apiGroup, resource, verb) neither the step's namespace Role nor the ClusterRole grants — that is a 403 at deploy time. And a command naming a kind the parser does not model — that one was judged by nobody, and a silent skip is indistinguishable from a pass.

A gap naming an object means the only matching grant is `resourceNames`-scoped and does not list that object.

Only a step declaring `serviceAccountName: pipeline-engine` is read: a step running under another account is subject to another Role, and this command holds no model of it. Full step declarations are loaded rather than a resolved workflow surface, because whose account a step runs under is not on the surface.

A step reaching `deploy-functions.sh` is counted and not judged: that script picks its namespaces at run time, so the commands it will issue are not readable here. What it does is covered by `ops check-rbac-escalation` instead.
