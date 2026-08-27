---
page-type-slug: finding
id: f76910e1-4e7b-5cce-b751-17e0b163eb00
title: "Modules the ops CLI reaches were deleted as unreferenced, though a guard credits those reaches"
domain-slug: domain/ops-cli
---

# Claim

The code repository deleted four modules the ops CLI reaches, each deletion stating the module had no inbound reference, while the guard that would have credited those reaches stands and works.

# Evidence

`bun tools/reaches.ts --json` publishes all four refs on 2026-08-21: `@shared/pages-access/pg`, `packages/alanwalton/personas/cli/src/persona/create.ts` and `packages/collections/chess-puzzles/src/lichess/ingest.ts`.

`packages/infra/checks/src/lib/ast-unused-reach-roots.ts` in the code repository reads that answer and credits instructions-repository reaches as analysis roots. Its own prose says a non-zero exit, an unrecognised shape or a tree that read no file refuses the run rather than shortening the list, so the guard fails loud rather than quiet.

The three deletion commits reason only from inside the code repository: `6e52ffac6a` states "None has an inbound reference, a bin entry or a package script"; `d247907e1e` states "Its only reference was its own unit test"; `05238649b5` names the 21 files it breaks, all of them in the code repository. Each of those readings is true of that repository alone, and each of the four modules had a live caller in `tools/`.

Not measured: whether `ops audit ast-unused` was run before any of the three deletions, and whether the guard would have been consulted by whatever route those seats took. The three commits are the only record read.
