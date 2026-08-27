---
id: fe08d2f5-eed4-540f-95f1-a57049664a21
slug: topic-register-ungoverned
page-type-slug: finding
title: "Topic register ungoverned"
domain-slug: domain/work-system
---

# Claim

Seventy items of standing undecided work sit in `public.pages` under page type `topic` and reach the work system through nothing. No document in the instructions repository declares `domain-slug: topic`, so no domain governs the page type, and `content` is empty on all 74 live rows, so a row holds a title and a status and nothing about what it means. The rows carry a `sensitivity` grading the findings store has no field for, and 37 of the 74 stand at `high` or `critical`.

# Evidence

Read through `ops db psql` on 2026-08-16, against `public.pages`.

Denominator: 77 rows of page type `topic`, of which 74 are live (`deleted_at is null`) and 3 deleted. Of the 74 live: 56 `someday_maybe`, 8 `planned`, 6 `up_next`, 3 `done`, 1 `in_progress` — so 70 undecided out of 74.

Every one of the 74 was created on 2026-04-19. All 74 share one identical `updated_at`, `2026-06-12 16:31:13.674268+00`, to the microsecond — one bulk write, not per-row edits.

`jsonb_object_keys(attributes)` over the 74 live rows returns four keys and no others: `sensitivity` (74), `status` (74), `parentId` (69), `relationships` (17). The column `status` and `attributes->>'status'` disagree on zero rows. `sensitivity` splits 28 `high`, 21 `not_applicable`, 12 `medium`, 9 `critical`, 4 `low`. `content` is jsonb and is empty on all 74.

The page type's own row (`seq` 75) declares `sensitivity` as a five-option select and `status` as a seven-option select whose options include `someday_planned` and `not_doing`, neither of which any live row holds. Its `relationships` property targets the relationship page type.

A recursive grep for `domain-slug: topic` across the instructions repository returns nothing.

Not measured: whether any row's status was ever different from the one it holds now — the single bulk `updated_at` cannot distinguish a row edited that day from one merely rewritten, and no history or events table was consulted. Nothing was read of the rows beyond title, status, timestamps and attribute keys, so no claim is made about what any individual item concerns. Whether anything outside `public.pages` reads this register was not checked. Whether the register duplicates work already standing as intent on some domain was not checked.
