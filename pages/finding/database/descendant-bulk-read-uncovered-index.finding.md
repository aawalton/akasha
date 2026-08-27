---
id: ca16dd04-bdfd-5a01-9950-58780cd2abf3
slug: descendant-bulk-read-uncovered-index
page-type-slug: finding
title: "Descendant bulk read uncovered index"
domain-slug: domain/database
---

# Claim

The descendant bulk read has no covering database index: `pages_active_page_type_descendant_covering_idx`, once listed in `attribute-predicate-index-coverage.md` as covering it, appears in no `.sql` file — only in that doc and as a fixture in `packages/infra/checks/src/lib/snapshot-attribute-indexes.unit.test.ts` — and nobody owns the decision to cover the read.

# Evidence

Project #16458 (domain database, status someday_maybe). `attribute-predicate-index-coverage.md` listed the descendant bulk read as covered by `pages_active_page_type_descendant_covering_idx`, marked in-flight under a project that is now `not_doing`.

The index appears in no `.sql` file: only in the doc and in `packages/infra/checks/src/lib/snapshot-attribute-indexes.unit.test.ts` as a fixture.

The doc has been corrected to treat the read as uncovered, so the false coverage claim is gone. The underlying read is still uncovered and no one owns the decision to cover it.

Row captured but never defined (no objective was written); this evidence is its capture moved off the retired `notes` attribute on 2026-08-15.
