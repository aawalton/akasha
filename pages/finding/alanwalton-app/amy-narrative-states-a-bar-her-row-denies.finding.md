---
id: 27317f88-d07d-542a-9e23-13b53cd1e661
page-type-slug: finding
title: "Amy narrative states a bar her row denies"
domain-slug: domain/alanwalton-app
---

# Claim

Amy's persona row states her own green-day bar wrong, on the row that holds it. Her `earningNarrative` says "her `greenDayPoints` is 10 — ten tasks completed in one ESO day is one green-day"; the row's `greenDayPoints` is 3600, a factor of 360 apart. The narrative also puts the change that would have set it in the past tense — "until #16235" — and #16235 is parked at `someday_maybe`, never done.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/persona-craft/economy-decisions-health.md`, whose Amy entry is a THIRD account of the same faucet and is queued for removal.

The row. `select attributes->>'greenDayPoints', attributes->>'faucetKind', attributes->>'faucetSource' from public.pages where deleted_at is null and page_type_slug='persona' and slug='amy'` returns `3600 | external | task-completions`.

The narrative on that same row: "Amy serves the **Health** value; her `faucetKind` is `external` and her `greenDayPoints` is 10 — ten tasks completed in one ESO day is one green-day on her ladder. Her points come from the work she actually shepherds: every `completed-task` row, counted one point each, unfiltered by category or difficulty (Alan's bar, 2026-07-25: *"total tasks completed that day, green is 10"*)."

So `faucetKind` agrees and `greenDayPoints` does not. The source is named differently too: `completed-task` rows unfiltered by difficulty, where `faucetSource` reads `task-completions`.

The project it credits never landed. `ops project list --seqs 16235` returns status `someday_maybe`, "#16235 Amy faucet: earn from total tasks completed per day (green 10), off Jen session-time". The narrative's "until #16235" reads as finished work, and 3600 is the pre-#16235 value still standing.

A third account exists, also unbuilt. The quarantined document above, written 2026-07-29 and so later than the 2026-07-25 bar the narrative quotes, records Alan retiring this faucet outright for the HUD's mean colour at a bar of 18. Three statements of one faucet, no two agreeing, and the row carries two of them itself.

Nothing reports it: no coherence rule compares a row's prose against its own attributes.

Not established: which of the three Alan wants, and whether the daily pass divides by 3600 or 10.
