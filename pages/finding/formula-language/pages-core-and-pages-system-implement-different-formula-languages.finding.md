---
id: 2221f4a9-4ba9-5e75-baf6-ac39723a2768
page-type-slug: finding
title: "Pages core and pages system implement different formula languages"
slug: pages-core-and-pages-system-implement-different-formula-languages
domain-slug: domain/formula-language
---

# Claim

`shared/pages-core/src/formula/` and `pages-system/formula/` are different languages, not one language implemented twice. pages-core refuses all 80 formulas in the page corpus at the first `{`; pages-system checks all 80 and refuses all 5 automation expressions tried. Automation is the only live caller of pages-core's language; the pages-ui callers resolve nothing.

# Evidence

Measured 2026-08-28 at commit `98384fa112`.

`pages-system/formula/run.ts:169-191` answers five functions, `now`, `text`, `hoursBetween`, `contains` and `hasWord`, which is exactly `pages/list/formula-functions.list.md:15-19`. `shared/pages-core/src/formula/functions.ts:116-135` answers nineteen, among them none of `hoursBetween`, `hasWord` or `text`.

All 80 `*.page-property-definition.md` files carrying `expression:` are written in the new language: 32 use `case(... otherwise ->)`, 36 use `??`, 6 `hoursBetween(`, 5 `hasWord(`, 1 `text(`. None uses `if(`, `today()`, `count(`, `daysBetween(`, `containsText(`, `addDays(`, `dayOfCycle(`, `joinPath(`, `min(`, `max(`, `toCalendarDate(`, `parseInstant(`, `toEsoDay(`, `resetInstant(`, `recurrence(`, `timeOfDay(` or `parseCalendarDate(`.

Both engines run over five real corpus formulas: pages-core refuses each at its first `{`, reporting `Unexpected character '{' at position 0`, and pages-system checks each. Over five real `=` expressions taken from `*.automation.md`, which use `source.category` member access and `"@date:" + today()`, pages-core parses each and pages-system refuses each. pages-core parses `if(count(tags) > 0, today(), "none")`, so it is not merely broken.

`pages-system/formula/` imports nothing outside itself and takes `now` from `Values` at `run.ts:170`. `shared/pages-core/src/formula/functions.ts:1-2` reaches `day/day` and `@shared/recurrence/scheduling`, and `:59-69` calls `Date.now()` and `new Date()`, while `shared/pages-core/package.json` declares `"functionalType": "pure"`.

`pages-system/formula/conformance.unit.test.ts` runs 386 cases citing 70 lines across 8 specification pages; all pass.

Eleven files import `@shared/pages-core/formula`: `automation/core/src/pure/value-resolve.ts`, `alanwalton/personas-core/src/green-day-fraction.ts`, and nine under `shared/pages-ui/`. `definitionOf` at `shared/pages-access/src/file-property-defs.ts:88-100` still builds `config` with `options` alone, so `isComputed` at `resolve.ts:33-34` is false for every file-backed definition and the nine pages-ui files resolve nothing.
