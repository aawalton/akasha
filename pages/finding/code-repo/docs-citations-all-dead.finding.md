---
id: 289f45ac-7a9a-5711-9926-35cd52ef19d8
page-type-slug: finding
title: "Docs citations all dead"
domain-slug: repo/code-repo
---

# Claim

Every `packages/**/docs/*.md` path cited from live TypeScript in the code repo is dead: 88 distinct paths are referenced and 88 are absent, the whole set having been lifted into the instructions repo's quarantine by one commit. A doc comment sending a reader to the reasoning behind a check now sends them nowhere, and nothing in the code repo reports it.

# Evidence

Collected over `*.ts` and `*.tsx` in the code repo: 88 distinct paths matching `packages/**/docs/*.md` are cited in source, and testing each against the working tree finds none of the 88 present.

The move was `7205e28efd` "quarantine every instruction surface into the instructions repo". The documents were not deleted — they stand in the instructions repo under `dirty/code/`, named for their old path with the separators flattened, so `packages/infra/checks/docs/exhaustive-dispatch.md` is now `dirty/code/packages-infra-checks-docs-exhaustive-dispatch.md`. That tree is itself queued for removal, so the citations degrade from unreachable to unrecoverable when it is swept.

Two instances met while ingesting the exhaustive-dispatch gate, both still on live source:

- `packages/infra/checks/src/checks/check-exhaustive-dispatch.ts:16` — "Per-check reference: `packages/infra/checks/docs/exhaustive-dispatch.md`."
- `packages/infra/checks/src/lib/ts-exhaustive-dispatch.ts:16` — "The TSTL fork ... is skipped at the scanner level — see `packages/infra/checks/docs/exhaustive-dispatch.md`."

The second is load-bearing rather than decorative: the scanner's carveout for `packages/temper/shared/build-deploy/tstl/**` is stated in code as a bare path prefix, and the document that carried why it exists is the one that went. The check file makes the same deferral for which files the gate walks and which it skips.

Both citations are also compiled into the shipped declarations at `packages/infra/checks/dist/src/checks/check-exhaustive-dispatch.d.ts:15` and `dist/src/lib/ts-exhaustive-dispatch.d.ts:16`, so the dead pointers travel with the built package.

Filed as a count because the existing findings in this class each name one site — `code-harness/coverage-cites-quarantined-surface.md`, `code-quality/carrier-taxonomy-reads-quarantined-docs.md`, `agent-harness/help-text-cites-quarantined-documents.md`, `agent-harness/code-binds-from-quarantined-surfaces.md` — and none records that the failure is total rather than scattered.
