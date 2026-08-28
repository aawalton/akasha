---
id: 55589082-6a37-5cce-9dd2-6ff864056409
slug: number-presentation-config-reaches-no-file-reader
page-type-slug: finding
title: "Number presentation config reaches no file-backed reader"
domain-slug: domain/pages-system
---

# Claim

53 `config` entries on page-type rows carried number presentation — `format` 17, `decimals` 15, `round` 13, `badgeVariant` 2, and `min`, `max`, `prefix`, `icon`, `units` once each — that reaches no file-backed reader.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`; re-checked 2026-08-27 at HEAD.

Sixteen number and formula properties carry `decimals: 0`, `format: number-with-separators`, `round: floor` together: `persona.totalPoints`, `value.totalPoints`, and thirteen on `relationship-progress` — `activeCalories`, `breathingPoints`, `cardioPoints`, `greenDayPoints`, `nutritionPoints`, `points`, `sleepPoints`, `sourcePoints`, `strengthPoints`, `strengthVolume`, `taskPoints`. `relationship-progress.greenDayFraction` differs only in `decimals: 4`.

The singletons: `persona.percentProgress` `format: percent`; `persona.greenDayTotal` `decimals: 2`; `story-chapter.audioDuration` `units: s`; `idle-persona-card.rank` `badgeVariant: yellow`, `format: short`, `prefix: "Rank "`; `idle-persona-card.stars` `badgeVariant: red`, `icon: star`; `idle-persona-card.ratePerSec` `format: short`; `temper-completed-task.priority` `min: 1`, `max: 4`. That `max` alone of the nine is read stands as `min-is-expressible-to-no-file-reader`.

Two further keys occur once each and are read by neither. `daily-tracking.totalHealthCapacityHours` is an `aggregate` carrying `function: sum`. `persona.defaultModel` carries `optionListRef: 019f33ee-fe31-72de-812c-3ea10bc1d72b`, the id of `instructions:option-lists/model-vocabulary.md`.

Formula bodies are not lost: `declarationsIn` reads `expression` at `page-declared.ts:102` and `page-derive.ts:304` evaluates it, and `properties/page-property-definition-expression.md` exists. All 15 stay statable, including `daily-tracking.stoplights`, which renders six coloured discs from the six life-area levels.

Nothing was restored. `relationship-progress` carries no property-definition page, and across all 2,285 property documents no key reads `format`, `decimals`, `round`, `badgeVariant`, `prefix`, `units` or `min`. The one `icon` key that stands is `page-icon`.

The 53 cannot be counted again: `DATABASE_ADHOC_URL` is named by no code in this tree, surviving only in the text of five finding pages. The green-over-an-empty-column line is filed on its own as `three-property-documents-state-a-key-no-reader-reads`.
