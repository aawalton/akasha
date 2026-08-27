---
id: 1c1e15cc-74f5-5ee9-97e4-de78afec641b
page-type-slug: old-ops-command
title: "Ops check-pages-ui-store-sidecar-memory"
slug: ops-check-pages-ui-store-sidecar-memory
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/check-pages-ui-store-sidecar-memory.ts
path: check-pages-ui-store-sidecar-memory
---

# Definition

- **Ops check-pages-ui-store-sidecar-memory** — every deployed app reaching the pages UI store gives its code-sync sidecar enough memory.

# Design

Which app a deploy carries is read off the workflow-template page that deploys it, which states its package outright.

A run that finds no page stating an app fails as a tool error rather than certifying the dependents it could not rule on.

# Help

Verify that every app depending on @shared/pages-ui-store gives its code-sync sidecar at least 2Gi.

The population is the workspaces that reach @shared/pages-ui-store through the transitive dependency closure of akasha. Which of them a deploy carries is read off the workflow-template pages here: a page of kind `apps` states the package it deploys, so deployability is declared rather than derived from where a workflow file happened to sit.

A deployable dependent that declares no `orchestratorCacheSyncSidecar` call in any TypeScript it owns fails: its limit was never read, so the run cannot certify it.

Exit codes:
  0  every deployable dependent declares a limit at or above the minimum
  1  a limit stands below the minimum, is unparseable, or was never declared
  2  tool / input error
