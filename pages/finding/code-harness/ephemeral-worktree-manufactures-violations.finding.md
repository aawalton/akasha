---
id: 4f7427b7-26e1-5957-a469-3fc096654bdc
slug: ephemeral-worktree-manufactures-violations
page-type-slug: finding
title: "Ephemeral worktree manufactures violations"
domain-slug: domain/global
---

# Claim

A check walking the import graph reports violations that are not there when run through `ops worktree ephemeral`, and reports them over a full module population, so its output does not read as blind. The git-stash guardrail names that verb as the way to establish whether a failure predates your own work, so an agent following the instruction is routed to the instrument that manufactures the failure it was sent to rule out.

# Evidence

Read 2026-08-11 at 00:20Z, on commit 78530f8b1d.

MEASURED. `bun ops worktree ephemeral -- bun packages/infra/checks/src/checks/check-ast-unused.ts` reports 2526 violations over 10888 of 10888 modules. The same check on the same commit in the installed checkout at `/home/walton/code` reports 4, over 10888 of 10888 modules. Two seats reached the pair independently, by different routes.

The populations are identical, so this is not the ephemeral tree seeing fewer files. The modules resolve; the imports between them do not, and an export nothing resolves to reads as unreached. Consistent with what leads the 2526: barrels, including `packages/shared/pages/core/src/index.ts` at 205 violations and the `workflow-dsl` barrel, both of which have known callers.

THE ROUTING. The git-stash guardrail states this verb as the remedy for the case "to verify a pre-existing failure", which is precisely the case in which an agent has no independent tree to disagree with. A seat lost real time to it and caught it only because it happened to hold a second, installed checkout.

INFERRED, NOT MEASURED. The mechanism. `ops worktree ephemeral --help` says the checkout it gives has node_modules LINKED, and `check-configs-service-typecheck.ts` documents bun's import-cache-on-symlink defect (#11986) and requires a real per-package `node_modules` before a config load for that reason. That is consistent with what was observed and is not established by it.

ALSO NOT MEASURED. Whether checks other than `check-ast-unused` are affected — `check-acyclic-imports` walks the same `ts-import-graph.ts` and was not run either way. Whether the over-report is stable across commits, or how long it has stood. Whether any verdict was ever accepted from an ephemeral run and acted on.
