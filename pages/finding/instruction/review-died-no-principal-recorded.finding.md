---
id: f8fc876b-da97-51a0-be4b-d9507092fa9b
slug: review-died-no-principal-recorded
page-type-slug: finding
title: "Review died no principal recorded"
domain-slug: domain/global
---

# Claim

An `instructions-review` run against `folders/code-repo.md`, dispatched under principal `worker-17366-6`, landed five commits (cutting `generated-help` and repairing the Package/Project glossary bullets) and then had no addressee to hand back to — both the dispatching seat and the row's owner `aine` were dead — so the results were recorded on project #17366 rather than delivered.

# Evidence

Project #17366, domain `instruction`. Remainder of the split of #17353 (kept: loader rebuild, agent-harness surfaces a code project needs). Carries the rest of the instruction domain's material and instruments reporting when it stops clean. Reasoning: `~/instructions/initiatives/instruction-estate.md`, names this seq.

[2026-07-31T23:58:30.489Z] `instructions-review` of `folders/code-repo.md`, principal `worker-17366-6`. `ops seat send` refused (non-wake-armed seat, holder dead); `ops seat alive aine` (row owner) also dead. Recorded under No Principal, not waited on.

Landed: `991ef8d7`+`e45f7e16` cut `generated-help` from manifest/section, removed `principles/generated-help.md`. `55101c74` `shared-worktree`: "top-level project"→"parent project". `28cc19ba` `backlog`: dropped worktree clause, named repository over "here". `5761887a` cut Package glossary bullet. `ae7b95ea` reviewed-self/domain/schema on subject and 4 surviving units; `reviewed-alan` outstanding on all 5.

Kept unchanged: definition, Project bullet, routing bullet, organization/operations.

Package cut, Project kept: Package's property was false — 352 declared workspaces, `check` generates ~3 pods (was ~54). Only per-package step left: `service-typecheck`, filtered to leaf packages outside the root reference graph. `domains/knowledge.md` already names the entity ("the role a workspace plays in a monorepo"); domain used no such word — repaired not narrowed. Project stays even with a narrower domain possible, needed by every code-repo reader; bullet now uses coined "parent project"/"child project" over `shared-worktree`'s third name "top-level project".

4 of 5 ranked units survive (failure each names still available once machinery checked): `backlog` (one git identity/commit, rowless change unattributable), `shared-worktree` (`ops worktree add --seq` builds any tree regardless of row species), `organization`, `operations` (`ops project rule` records+delivers a ruling in one act).

Capture cut mid-doc.
