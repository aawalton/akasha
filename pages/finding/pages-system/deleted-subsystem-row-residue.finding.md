---
id: c38acf78-df37-5352-953e-0e550fdc490b
page-type-slug: finding
title: "Deleted subsystem row residue"
domain-slug: domain/pages-system
---

# Claim

A subsystem deleted under #14058 left a live `property-definition` row and 2659 project rows carrying its attribute, with no writer and no reader in the tree, and the surviving definition keeps the dead key legal to write today.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f` and the live database. A quarantined document reported the same figures on 2026-07-30; both counts reproduce unchanged, so this is filed as a standing state rather than as a relayed reading.

    rg -l 'intakeStampedAt' over the tree → 0 files
    select count(*) from public.pages where page_type_slug='property-definition'
      and attributes->>'stringId'='intakeStampedAt' and deleted_at is null → 1
    select count(*) from public.pages where page_type_slug='project'
      and attributes ? 'intakeStampedAt' → 2659

The subsystem was `@alanwalton/needs-intake-watcher`, deleted under #14058. The comment recording that deletion survives at `packages/infra/ci/orchestrator/src/dispatcher/reap-retired-subscribers.ts`.

The live definition is the part that matters. The rows alone are inert; the definition is what makes `intakeStampedAt` a declared attribute rather than an undeclared one, so property-definition coverage passes it and the write boundary would accept a new write today. Nothing a future reader can reach says nothing has written it since #14058.

Nothing measures this. `ops deletion-residue` reads four carriers — `instructions-surfaces`, `instructions-prose`, `repo-markdown-prose`, `pages-row-text` — and its row carrier is scoped to `DOCTRINE_PAGE_TYPES`, which is `["persona", "framework-doc"]` at `packages/infra/checks/src/lib/citation-carriers.ts:59`. Neither `project` nor `property-definition` is in it, so this residue is outside the population of the one instrument built for the question.

A file the tree no longer holds is greppable by absence; a row is not. Deleting a subsystem removes its code in one commit and leaves its data with no owner and no expiry, while every check over the file tree reads clean.

Not established: how many other deleted subsystems left row-residue. This is one instance, not a sweep.
