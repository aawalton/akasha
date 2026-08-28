---
id: 6f028f5b-da9b-54ec-a025-677c70d9ad62
slug: completions-without-a-task-backlink
page-type-slug: finding
title: "254 completions carry no task backlink, and none of them is fabricated"
domain-slug: domain/temper
---

# Claim

254 completions in Alan's temper records carry no `task` backlink, so nothing traces them to the task they completed. None is fabricated: every one holds a genuine `completed-at`. 262 of the original 516 were recovered by title on 2026-08-20, and the rest cannot be, because the task each names is deleted, is a test fixture, or was never recorded at all.

# Evidence

Run on 2026-08-20 against the working tree, not read.

Counted over the sidecars under `temper/completed-months/` by testing each line for a `task` key. Missing against total, by file: 2026-03 102 of 352, 2026-04 36 of 60, 2026-05 79 of 359, 2026-06 22 of 273, 2026-07 14 of 170, 2026-08 1 of 191. Total 254 of 1,405 rows.

All 254 hold a `completed-at` beginning `20`, so none is a row whose instant was defaulted.

Of the 254, 189 name a real task since deleted that holds no file, and the `task` property is a relation onto a task slug, so a value for them would resolve to nothing. 35 are test and probe fixtures. 29 name a task no row holds, live or deleted. One states no title at all: `019db533-f3b3-7058-ba38-f9d8fc8792e7` in the 2026-04 sidecar, which still holds `completed-at` `2026-04-12T14:19:25.529Z`, a character, an eso-character-id, a scope, a priority and a recurrence rule. It is a degraded record of something real, not an invented one.

The mechanism was a null slug meeting a write seam that drops nulls. A file-backed task stated no slug of its own, so the value read null, and an empty array serialises to nothing, which is why the key is absent rather than present and null. A task's slug now falls back to its file stem, and the writer raises rather than filing a row it cannot name, so the count does not grow.
