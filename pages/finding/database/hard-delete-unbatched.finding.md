---
id: 12ff5da6-9178-5a01-83e3-b9d0b8c414ed
slug: hard-delete-unbatched
page-type-slug: finding
title: "Hard delete unbatched"
domain-slug: domain/database
---

# Claim

`page_type_hard_delete` takes a page type's whole population in one transaction, with no batching and no ceiling on what it locks.

# Evidence

The function loops `FOR v_old IN SELECT * FROM public.pages WHERE p.page_type_slug = row.slug ... FOR UPDATE`, with no `LIMIT` anywhere in its body. Every page of the type is locked and deleted inside the single transaction the call runs in.

Project 19431's own plan named this: "Batch, and raise rather than loop without progress. One array of every id is unbounded, and a batch that comes back undeleted would otherwise spin forever." That step did not ship in migration #5611.

Measured 2026-08-19 taking the six code-harness page types. `step` at 977,549 pages completed in 4 minutes 4 seconds, holding every one of those row locks for the duration. `workflow` at 56,932 first hit the default 10-second `statement_timeout` and rolled back whole; it went through only after the session ceiling was raised to 30 minutes. So the working procedure today is to raise `statement_timeout` by hand, and the failure mode at the ceiling is that the entire delete unwinds.

Two shapes would fix it and the choice is open. `SelectForUpdateArgs` in `packages/shared/pages/proc/src/ctx-args.ts` carries `pageTypeSlug`, `deletedAt` and `where` but no `limit`, so lowering one through the proc compiler is one route. The other is a caller-side loop in `ops page-type hard-delete` over an RPC taking up to N pages of a type at a time, which is the shape `page_hard_delete_by_ids` already has.
