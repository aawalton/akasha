---
id: 3caa613d-20c1-59dd-82c3-a1093936a5ca
page-type-slug: finding
title: "Merge queue docs pointers dead"
domain-slug: domain/global
---

# Claim

The merge-queue coordinator's whole `docs/` tree was lifted into instructions-repo quarantine and the code it was lifted out of still points at it. No markdown file remains anywhere under `packages/infra/ci/merge-queue/`.

Thirty-five citations across that package's TypeScript now resolve to nothing, several of them in headers that say the reasoning lives at the named path rather than in the file.

# Evidence

Read 2026-08-07 off the `~/code` checkout and the `~/instructions` checkout.

`find packages/infra/ci/merge-queue -name "*.md"` returns nothing.

A `grep` for `docs/[a-z-]*\.md` across `*.ts` under that package, excluding `dist`, returns 35 lines. The distinct targets are `docs/authoring-shapes.md`, `docs/batch-formation-regen.md`, `docs/bisection.md`, `docs/cli.md`, `docs/coverage.md`, `docs/crash-recovery.md`, `docs/merge-queue-design.md` and `docs/recycle-guard.md`, some spelled relative as `../../docs/…`.

One example of the shape: `packages/infra/ci/merge-queue/coordinator/src/coordinator/apply-staging-regen.ts` opens "Batch-formation regen step (project #14179 — see `../../docs/batch-formation-regen.md`)", which is the file a reader is sent to for the design behind the step.

The bodies are not lost. `~/instructions/dirty/code/` holds them under flattened names — `packages-infra-ci-merge-queue-coordinator-docs-batch-formation-regen.md`, `…-docs-bisection.md`, `…-docs-cli.md`, `…-docs-crash-recovery.md`, `…-docs-constraints.md`, `…-docs-files.md`, `…-docs-concurrent-main-staging.md` and others, beside `…-coordinator-claude.md`. They are under quarantine, so they bind nobody and are queued for their own removal.

Nothing in the code repo records that the move happened, so a reader following a pointer finds an absence and cannot tell a moved document from a deleted one.

Found emptying `dirty/knowledge/merge-queue.md`.
