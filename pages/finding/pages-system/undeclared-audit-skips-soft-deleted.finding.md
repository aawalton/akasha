---
id: 7990ad77-b624-5cc9-bd15-5dc2611f41ae
page-type-slug: finding
title: "Undeclared audit skips soft deleted"
domain-slug: domain/pages-system
---

# Claim

The deploy-time undeclared-attributes audit selects `WHERE p.deleted_at IS NULL`, so a soft-deleted row carrying an attribute key no definition backs is outside the ratchet entirely. `page_undelete` returns such a row to the live population, at which point the next deploy gate fails on a row nobody wrote. The gap is invisible while it stands, because the audit is green precisely by not looking.

# Evidence

Read 2026-08-07 against `~/code`. `packages/shared/pages/proc/src/_page_undeclared_attributes.audit.sql:129` reads `WHERE p.deleted_at IS NULL`. The file's own header states its purpose as diffing "the attribute keys present in live row data" against each page-type's materialized blob, so the filter is deliberate; what is undeclared is that undeleting restores rows the audit never examined.

Soft-deleted rows do carry such keys today. Diffing every attribute key on soft-deleted rows against the live page-type blobs (matching both `id` and `pageId`, so the dual-key convention is honoured) and excluding any key that is some property-definition row's `stringId` anywhere, live or soft-deleted, returns 14 (page_type, attr_key) pairs across 99 key-instances. Among them: `task.dueAt` (11), `temper-task.dueAt` (9), `project.requester` (2), `project.created_by` (1), `story-chapter.diagnosticFixture` (1).

This query is mine, not the audit's, and is a lower bound rather than the audit's own answer: it does not walk `_pt_ancestors` for soft-deleted definitions the way the audit's retired arm does, and several of the 14 are system keys on `page-type` and `property-definition` that the audit may treat separately. The structural claim rests on line 129, not on the count.

A quarantined document measured 10 pairs across ~69 key-instances on 2026-07-28 and named a control — the same predicate over live rows returning 0 refused. Five of its ten named pairs reproduce here.

The audit's two other blind spots are filed separately and are not this one: `~/memory/findings/collections/completion-markers-unfilled.md` records that it runs one direction only, and `~/memory/findings/tests/pglite-harness-cannot-supply-a-retired-definition.md` records a different `deleted_at` filter, in `install-from-live.ts`. Searched `~/memory/findings/` with `rg -uuu -ni "undeclared|page_undelete|soft-deleted row|ratchet"`; nothing carries this one.
