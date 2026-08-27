---
id: cdce136d-45b5-5aed-afa8-d4f263ed0268
slug: upsert-page-row-owner-hole
page-type-slug: finding
title: "Upsert page row owner hole"
domain-slug: domain/pages-system
---

# Claim

`packages/shared/pages/proc/src/upsert-page-row.ts:22` writes a raw `ON CONFLICT (id) DO UPDATE SET user_id = EXCLUDED.user_id`, which is the one remaining owner-reassignment hole that `_enforce_owner_stability` does not cover, because this write bypasses the proc layer that guard is attached to.

# Evidence

From project #16019 (domain `pages-system`, status `someday_maybe`, captured 2026-07-25T09:49Z, owned by ember, tagged `author:ember`, child of #15971 "the unscoped service-role page query is the majority pattern outside the personas CLI"). The row's `# Notes` body was empty — the whole observation was carried in its title, unlike its siblings in this conversion batch whose notes held the capture text; recovered by reading the title directly since the notes-only file this batch worked from showed nothing.

Title, verbatim: "pages/access pg/upsert-page-row.ts:22 raw ON CONFLICT (id) DO UPDATE SET user_id = EXCLUDED.user_id — the ONE remaining owner-reassignment hole `_enforce_owner_stability` does not cover, because it bypasses the proc layer entirely."

No further detail (no code excerpt, no verification notes, no acceptance criteria) exists anywhere on the row. The title frames this as the last item in a sweep for owner-reassignment holes against the `_enforce_owner_stability` guard introduced around #15971, with this raw upsert being the one write path that guard's proc-layer attachment does not reach.
