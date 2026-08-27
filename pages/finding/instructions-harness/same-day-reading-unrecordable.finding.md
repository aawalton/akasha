---
id: 91c0eb10-a5e8-59ed-bdee-0c62ab9742aa
page-type-slug: finding
title: "Same day reading unrecordable"
domain-slug: domain/global
---

# Claim

A document created and churned on one day cannot have its review record cleared by a reading on that same day: `reviewed-at` already holds today's date, so writing it again yields no diff, no commit, and nothing for `stale-reviews` to measure from. The reading leaves no trace and the document stays owed.

# Evidence

`bun tools/stale-reviews.ts` names a document owed a reading from characters moved since the commit that wrote its `reviewed-at` key.

Observed on `domains/domain-design.md` during a perimeter pass on 2026-08-05. `git blame` puts its `reviewed-at` value in `6d12517e`, the commit that created the file that morning; four later commits the same day moved more than the thousand-character threshold. The value was already `2026-08-05`, so the reviewer had nothing to write.

Measured after the reading completed: `domains/domain-design.md` is still on the owed list, while `domains/global.md`, `domains/agent-harness.md` and `domains/folders/instructions-repo.md` — read earlier in the same pass, each on a document whose key held an earlier date — have cleared.

The key is specified as `REVIEWED_AT` in `tools/document/schemas/domain.ts:54` and carries a day, so the granularity is what the trap turns on. It resolves on its own the next day, when a reading writes a date that differs. What it costs is that a same-day reading is unrecorded and a later pass re-dispatches one that has already happened.
