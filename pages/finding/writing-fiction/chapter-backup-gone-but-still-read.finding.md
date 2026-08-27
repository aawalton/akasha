---
id: 9dd6ea25-56ee-5ef4-a800-9deaad3ed88a
slug: chapter-backup-gone-but-still-read
page-type-slug: finding
title: "The chapter-backup type is gone from every world while 804 events and two modules still reach it"
domain-slug: domain/global
---

# Claim

`story-chapter-backup` is gone from every world that could hold a page of it — no page-type row, no file, absent from the roster — while 804 events still name its id and two modules in the code repository still read it.

# Evidence

Measured 2026-08-20, each independently.

No page-type row carries the slug `story-chapter-backup`: the count over `public.pages` where `page_type_slug = 'page-type'` is 0. `pages/page-type/story-chapter-backup.page-type.md` stands and states `id: 019ea280-38c7-774d-80f0-8d584a991d01` and `files: none`, so the type is absent from the roster the query service serves at `/page-types`, and a read addressed to it resolves to nothing. No file in akasha states `page-type-slug: story-chapter-backup`.

804 events stand under that id, every one `event_name = 'updated'`, all on 2026-08-18. No `event_subscriptions` row names it. The `id:` line of the page-type document is the only place the type's name survives beside its uuid, so nothing that greps for a slug reaches those events.

Two modules in the code repository still address the slug:

- `packages/collections/wandering-inn/src/recover-chapter-backup.ts:6`
- `packages/collections/wandering-inn/src/backfill-gated-chapters.ts:11`, whose `readBackupByNumber` streams the type to build the recovered prose that `planBackfill` fills gaps from

Both answer zero rather than raising, so `backfill-gated-chapters` reports "0 recovered backup chapters available" and plans a backfill with no prose to put in it, which reads the same as a run that found nothing to recover.

What the 804 updates were taken from, and whether the prose they carry is still wanted, is not settled here. The type was a chapter's text kept aside before the chapter was written over; the wandering-inn chapters it backed now stand as 828 files under `story-chapter-wandering-inn`.
