---
id: 81c75175-0eef-53a3-a7e5-daa0c6202dd8
slug: fizz-migration-doc-overclaims
page-type-slug: finding
title: "Fizz migration doc overclaims"
domain-slug: domain/global
---

# Claim

A TS-to-fizz migration doc claims completeness it does not have: it says the migration is complete for every spec under `packages/workers/*/spec/`, a directory that does not exist, 21 `.fizz` files (concentrated in `packages/infra/ci/merge-queue/coordinator/spec/` and `orchestrator/spec/`) have no paired `src/pure/*.spec.ts`, and it claims `@shared/proc-compiler/forbidden` is reused verbatim by the fizz compiler though no non-test source in `packages/shared/fizz-compiler/src/` imports it.

# Evidence

Project #16453 (domain code-harness, status someday_maybe). Surfaced while removing historical references from instruction surfaces: the old material was removed but left three claims standing that the change itself did not verify.

1. The doc states the TS-to-fizz migration is complete for every spec under `packages/workers/*/spec/`. That directory does not exist.

2. 21 `.fizz` files have no paired `src/pure/*.spec.ts`, concentrated in `packages/infra/ci/merge-queue/coordinator/spec/` and the sibling `orchestrator/spec/`.

3. The doc claims `@shared/proc-compiler/forbidden` is reused verbatim by the fizz compiler, but no non-test source in `packages/shared/fizz-compiler/src/` imports it.

Resolving any of these means deciding whether the doc or the code is wrong, which needs a domain owner.

Row captured but never defined (no objective was written); this evidence is its capture moved off the retired `notes` attribute on 2026-08-15.
