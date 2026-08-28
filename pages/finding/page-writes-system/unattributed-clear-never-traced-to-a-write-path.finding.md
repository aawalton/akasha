---
id: c468d410-3645-44ba-a0bd-220fe71b0386
slug: unattributed-clear-never-traced-to-a-write-path
page-type-slug: finding
title: "The unattributed clear was never traced to a write path"
domain-slug: domain/page-writes-system
---

# Claim

One write cleared a user-authored field without recording who made it, and the path that made it was never found. Alan confirmed the clear was his own and deliberate, so nothing was lost — the defect is that nothing could tell his edit from anyone else's. The sweep for other instances was never run, and the evidence that could have identified the path has since been deleted with the Postgres pages layer, so this instance can no longer be attributed by anyone.

# Evidence

Observed 2026-07-24 on page `019f5183-6045-7bb8-b382-8f77fdf4e1b3` (persona, slug `alan`), field `alanNotes`. Found by accident: awen asked whether Alan's correction pass had landed, and answering that needed key-level history rather than `updatedAt`.

Between 11:19:49Z and 11:20:24Z, eight versions, each stamping `actor` with Alan's user id — the signature of typing in a rich-text editor. Then at 11:38:33Z, one version with `actor` empty, no other edit of his that morning lacking one, whose patch set `alanNotes` to a single empty paragraph while the prior value stood in `oldValues` — his own working list, not agent-generated.

`userId` could not discriminate: it was the tenant owner on every row rather than the writer, identical on both writes. `actor` was the only discriminator and it was empty.

Resolved as to harm 2026-07-25T11:50:15Z, Alan confirming "No — I cleared it deliberately, leave it." No data loss on this instance: the point is not that content was destroyed but that a clear of user content and a deliberate user edit were indistinguishable after the fact.

Three things were left undone. Which write path skipped the actor stamp was never identified. Whether such a write should be refused at the boundary rather than merely recorded was never decided. And the sweep across other pages and users was never run — this page alone carried 376 `alanNotes` versions.

The forensic handle: a write whose patch sets a rich-text field to a single empty paragraph, with prior content in `oldValues` and no actor, is the shape.

What can no longer be done: `public.pages` and `page_versions` are gone with the Postgres pages layer, along with `ops page history` and `ops page revert`, which is how the timeline above was read. `git grep` finds both table names only inside other findings' prose and in no live code. No sweep of the old store can be run.

This stood until 2026-08-28 as `unattributed-write-clears-user-content` under `domain/pages-system`, id `4d658dde-26d8-5a05-9a7f-32ef57a80752`, deleted at `98cee3137`.
