---
id: 4d658dde-26d8-5a05-9a7f-32ef57a80752
slug: unattributed-write-clears-user-content
page-type-slug: finding
title: "Unattributed write clears user content"
domain-slug: domain/pages-system
---

# Claim

A write path that reaches `public.pages` can clear a user-authored field without recording an actor, while the ordinary editor path on that same field, on the same page, records one on every save — so an unattributed write is indistinguishable after the fact from a deliberate user edit, and this asymmetry stands regardless of what triggered the one observed instance.

# Evidence

Project #16093, domain `pages-system`. No objective; notes only. Found by accident (awen asked whether Alan's correction pass on the `alan` persona page had landed; answering needed key-level history, not `updatedAt`).

PAGE: 019f5183-6045-7bb8-b382-8f77fdf4e1b3 (persona, slug `alan`). Field: `alanNotes`.

TIMELINE (`ops page history`, durable `page_versions`): 2026-07-24T11:19:49–11:20:24Z, eight versions, each stamping `actor`=Alan's user id — the signature of typing in a rich-text editor. Then 2026-07-24T11:38:33Z, one version, `actor`=empty (no other of his edits lacked one), patch sets `alanNotes` to a single empty paragraph; `oldValues` holds the full prior content (his own working list, not agent-generated).

`userId` was identical on both writes because it is the RLS tenant owner on every row, not the writer, so it cannot discriminate who made the 11:38 write. `actor` is the only discriminator and it was empty.

NOT LOST: full value durable in `page_versions`; `ops page revert` restores it in one call. Not reverted at capture time since overwriting current state on a guess is a user-intent call, not the finder's.

RESOLVED 2026-07-25T11:50:15Z: Alan confirmed the clear was his own deliberate action ("No — I cleared it deliberately, leave it"). No data loss, no incident on this instance.

STANDING DEFECT: some write path reaches `public.pages` and can clear user content without stamping `actor`, unlike the ordinary editor path on the same field. That gap makes a future unattributed write on this table unauditable by construction. Scope left for whoever takes it: (1) find which write path skips the actor stamp — the empty-paragraph payload is the signature to grep for; (2) decide whether unattributed writes to user-authored fields should be rejected at the boundary, not merely recorded; (3) check other pages/users for the same gap — one instance found by accident is weak evidence of frequency, and this page alone carries 376 `alanNotes` versions.
