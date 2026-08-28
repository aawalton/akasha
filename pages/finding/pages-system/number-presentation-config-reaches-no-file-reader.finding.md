---
id: 55589082-6a37-5cce-9dd2-6ff864056409
slug: number-presentation-config-reaches-no-file-reader
page-type-slug: finding
title: "Number presentation config reaches no file-backed reader"
domain-slug: domain/pages-system
---

# Claim

A record of what 53 `config` entries on page-type rows carried, read on 2026-08-20 from a database this tree can no longer reach. Beyond colour they carry number presentation: `format` 17, `decimals` 15, `round` 13, `badgeVariant` 2, and `min`, `max`, `prefix`, `icon`, `units` once each. Recorded rather than restored — none of it has been written into a property document since, and this page is the only surviving statement of what those entries said. What the record was for: a property document for one of these keys would read green over an empty column, so restoring one means first settling which reader is meant to read it.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`.

One scheme dominates. Sixteen number and formula properties carry `decimals: 0`, `format: number-with-separators`, `round: floor` together: `persona.totalPoints`, `value.totalPoints`, and thirteen on `relationship-progress` — `activeCalories`, `breathingPoints`, `cardioPoints`, `greenDayPoints`, `nutritionPoints`, `points`, `sleepPoints`, `sourcePoints`, `strengthPoints`, `strengthVolume`, `taskPoints`. `relationship-progress.greenDayFraction` differs only in `decimals: 4`.

The singletons: `persona.percentProgress` `format: percent`; `persona.greenDayTotal` `decimals: 2`; `story-chapter.audioDuration` `units: s`; `idle-persona-card.rank` `badgeVariant: yellow`, `format: short`, `prefix: "Rank "`; `idle-persona-card.stars` `badgeVariant: red`, `icon: star`; `idle-persona-card.ratePerSec` `format: short`; `temper-completed-task.priority` `min: 1`, `max: 4`.

`min` and `max` occur once, on that one property, as a pair. Neither is read. `properties/page-property-definition-max.md` exists and `page-property-definition-min.md` does not, but that asymmetry is between two documents that both carry nothing to a reader rather than between an expressible key and an inexpressible one.

Two further keys occur once each and are read by neither. `daily-tracking.totalHealthCapacityHours` is an `aggregate` carrying `function: sum`. `persona.defaultModel` carries `optionListRef: 019f33ee-fe31-72de-812c-3ea10bc1d72b`, the id of `instructions:option-lists/model-vocabulary.md` — that list already stands as a file, so the reference is recoverable where the aggregate function is not.

Formula bodies are the exception and are not lost: `declarationsIn` reads `expression` at `page-declared.ts:102` and `page-derive.ts:304` evaluates it, and `properties/page-property-definition-expression.md` exists. All 15 stay statable, including `daily-tracking.stoplights`, which renders six coloured discs from the six life-area levels.

# Re-check

Checked again 2026-08-27 at HEAD. One statement above is false, and is false rather than merely old.

`max` is read. `declarationsIn` asks for it at `page/property/declarations.ts:143`, and `page/property/record.ts:16` carries it. So "None of the nine appears in `definedOn`'s seven keys or `declarationsIn`'s thirteen" does not hold, and the paragraph on `min` and `max` inverts: that pair is now exactly the asymmetry it said it was not — `max` is expressible to a file reader and has a document, `min` is expressible to none and has no document.

The source cannot be re-measured. `DATABASE_ADHOC_URL` is named by no code in this tree; it survives only in the text of five finding pages, this one among them. The 53 entries above cannot be counted again from here.

Nothing was restored, so the record is still load-bearing. `relationship-progress` carries no property-definition page at all, and across 2,285 property documents no key reads `format`, `decimals`, `round`, `badgeVariant`, `prefix`, `units` or `min`. The one `icon` key that stands is `page-icon`, a page's own icon rather than this presentation key.

That figure first read 2,228 and is corrected here on 2026-08-28. 2,228 is the count under `pages/page-property-definition/`; the corpus is 2,285, because the page type's declared glob is `akasha:**/*.page-property-definition.md` and 57 documents stand beside their own domains under `graph/` and `readouts/`. This is a withdrawal rather than drift: at `29e89a430`, the commit that wrote this re-check, `git ls-tree -r` already gives 2,285 repo-wide against 2,228 under the directory, so the number was wrong against the tree it was taken on. The claim it carries is unaffected — checked over all 2,285, none states any of the seven keys.

The green-over-an-empty-column line is live and is filed on its own as `three-property-documents-state-a-key-no-reader-reads`, under `page-type/page-property-definition`, whose standing instance is `derives`. Confirmed here by writing `decimals: 0` and `format: number-with-separators` onto a property document: all nine gates passed and none refused. Its predecessor, slugged `a-property-document-can-read-green-over-an-unread-key`, named `max` as its standing instance; this re-check unsettled that, and that finding was taken away on 2026-08-28.
