---
id: 819ae835-57a2-5e04-8aa6-c7b2a5494b3f
page-type-slug: finding
title: "A reach that parses a code-repo file's text fails the graph build when that file goes"
domain-slug: repo/instructions-repo
---

# Claim

Deleting code on the evidence of typecheck, tests and an import search alone will therefore break
the instructions repo silently, and the break surfaces later, in CI or in a command,
rather than at the change that caused it.

# Evidence

Taken on 2026-08-23 against the code repo at branch `change-19458`, one commit after
`9d39e29699` removed `packages/infra/workflow-dsl` and 51 `*.workflow.ts` files.

A seventh reach is by file content rather than by import.
`tools/lib/graph/producers/cluster-check/composition.ts:46` reads
`packages/infra/checks/src/checks.workflow.ts` as text and resolves `IMAGES.BUN`
through the TypeScript AST, following the import to whatever module declares it. When
that module went, resolution returned null and the whole graph build failed with
`graph: packages/infra/checks/src/checks.workflow.ts declares no readable default image`.
The same call at `b9d20ae15c` returns `{ stepPrefix: "check-", defaultImage: "debian:bookworm-slim" }`.
