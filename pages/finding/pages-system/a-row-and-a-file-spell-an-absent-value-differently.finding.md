---
id: 01a02000-c71b-7000-b6b1-2e4aebc8ef36
slug: a-row-and-a-file-spell-an-absent-value-differently
page-type-slug: finding
title: "A row and a file spell an absent value differently"
domain-slug: domain/pages-system
---

# Claim

155,931 sidecar rows hold an empty string in a key declared `text`, and `text` refuses an empty string — but nothing asks `text` about a row, because `judgeRow` evaluates no value rule at all. The same declarations refuse nothing on any of 59,151 markdown pages, where a writer omits an absent key rather than writing one empty. The two halves of the corpus spell absence differently. The disagreement is latent, and which spelling is right is unsettled.

# Evidence

Re-measured 2026-08-28 over 4,522,201 rows in 11,564 sidecars across 44 row page types, in the two repositories standing today, `akasha` and `code-editor`. The 2026-08-20 reading of 352,925 rows in four repos is superseded: `stories:` and `instructions:` are now folders inside akasha, and `log-line` alone holds 4,107,605 rows, appended live — the count moved 3,097 between two runs eight minutes apart.

728,068 key instances on 155,931 rows hold an empty string in a `text` key without `blank: true`. `temper-mined-item` carries 727,527: `abilityHeader` 155,432, `abilityDescription` 154,141, `flavorText` 127,572, `enchantDescription` 108,581, `enchantHeader` 108,581, `traitDescription` 37,348, `setName` 35,872. The rule stands at `page/property/value.ts:180-187` and refuses on a bare `value === ""` at `:185`, without the trim every `scalarRule` applies.

Nothing evaluates it on a row. `judgeRow` at `page/property/judge.ts:184-207` takes neither a vocabulary nor an arming, so it cannot arm a rule; it tests an undeclared key and a required key dropped from a standing row, then returns. `armFor` has two callers, both inside `judgeFrontmatter`. The write path calls the same `judgeRow` at `tools/lib/page-rows-write.ts:148`, `:218` and `:306`, so such a row is not refused on write either. The check dedupes by key shape at `checks-system/check/page-holds-to-its-type/rows.ts:98-99`. Replaying the armed rules over every string value in every row gives 823,476 refusals nothing performs.

Control: the real `judgeFrontmatter` over 59,151 claimed markdown pages gives 0 refusals of any kind, stronger than the 2 read on 2026-08-20.

`blank: true` is for exactly this case, and two property documents in the corpus use it — `learn-everything-topic-calibration` and `page-cover`. Declaring it on the seven `temper-mined-item` keys clears 155,931 rows at no data cost. Spelling absence by omission instead changes those rows and the writer that appends them.