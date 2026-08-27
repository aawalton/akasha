---
id: 22d23188-ab58-56d8-8a20-968d41b7ab2e
slug: pipeline-design-names-rows
page-type-slug: finding
title: "The pipeline page type is file-backed but its design still names rows"
domain-slug: domain/global
---

# Claim

`page-types/pipeline.md` declares `files: memory:pipelines/*.md`, so its pages are files. Its Design line at 30 says each worker reads the authoritative rows on every tick. There are no rows: the last two page-type rows were retired on 2026-08-20 and `public.pages` now holds zero live pages of any type. The line governs `packages/infra/ci/**`, `packages/infra/workflow-dsl/**` and `packages/infra/local-executor/**` through `code-path:`, so it is what a seat working anywhere in the CI tree reads as settled.

# Evidence

The declaration and the Design line stand together on the same document, at lines 6 and 30 as of `reviewed-date: 2026-08-19`.

Whether a row exists is not the point and the count is not the argument: pipelines, steps, workflows, branches and merge-queue batches are all at zero because the old pipelines were brought down deliberately for this transition, and the new ones have not been brought back up. The point is that the page type's own `files:` key and its own Design line describe two different storage models, and a reader below inherits both.

This surfaced three times from different directions, which is why it is worth one line rather than three. A sweep for HTTP callers of the pages table found exactly one, `packages/infra/ci/cli/src/lib/write-changed-files.ts:19`, which builds a PostgREST URL naming `pipeline` — and it is named only as a shell string inside a workflow step at `packages/infra/ci/workflows/src/prep.workflow.ts:65`, so no import graph reaches it. A sweep for the contiguity alarm found a postgres_exporter query that cannot be repointed at a file-backed type at all, because SQL against Postgres cannot read markdown. And a repoint of `packages/infra/ci/cli/src/lib/pipeline-pages.ts` off `createdAt` onto `seq` was needed because every file page carries the same constant 1970 instant, so ordering by `createdAt` silently ceases to exist.

Each of those is a caller waiting on which model this page type means. Settling line 30 settles all of them at once.

One trap for whoever takes it: `created-at` and `updated-at` are that constant instant on every file-backed page, so a grace window or a contiguity gap computed from either is meaningless rather than merely wrong.
