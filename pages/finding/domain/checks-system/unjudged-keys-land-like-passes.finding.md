---
page-type-slug: finding
title: "Unjudged keys land like passes"
domain-slug: domain/checks-system
---

# Claim

`judgeFrontmatter` answers in three channels: `refusals`, a blocking `why`, and `unjudged` — the keys it was handed and could not judge (`page/property/judge.ts:12-17`). The check that gates every page write reads two of them. `outsideProperties` at `checks-system/check/page-holds-to-its-type/page-holds-to-its-type.check.code.attachment.ts:36-37` returns `verdict.why === null ? verdict.refusals : [verdict.why]`, and nothing in the repository reads `verdict.unjudged` at all. A key whose type carries no rule lands exactly like a key that was checked and held, and the gate says nothing either way.

# Evidence

Verified in the tree on 2026-08-28. The two lines stand as quoted. `page/property/judge.ts:15` declares `readonly unjudged: readonly string[]` on `Judgment`, and lines 103, 137, 149, 153 and 171 fill it. A search for `unjudged` across the tree returns the producers — `page/property/judge.ts`, `page/property/choice.ts` and the two `.d.ts` beside them — an unrelated `Unjudged` predicate in `checks-system/check/links-resolve/`, and the word in command help prose. No consumer reads `Judgment.unjudged`.

The counts below are a reading another seat took over 2026-08-27 and 2026-08-28, against a tree that advanced three times during the measurement. They are snapshots of that tree and are not re-derived here. Reading `unjudged` takes gate refusals from 640 to 5,325. Of the 4,685 added, 127 are keys judged elsewhere — attachment keys, whose values sit beside the page, so refusing those would be wrong — and 4,558 genuinely could not be judged, from five type names: `json`, 4,323 keys across 2,607 pages; `template`, 111 across 111; `text | list(text)`, 60 across 60; `relation-name`, 34 across 23; `string`, 3 across 3. An entry for `json` in the lookup table would take the added refusals to roughly 235.

What I re-checked on 2026-08-28 rather than taking on report: `RULES` at `page/property/value.ts:143-180` names `slug`, `text`, `uuid`, `process`, `relation-id`, `relation-seq`, `relation-slug`, `relation-address`, `boolean`, `number`, `size`, `instant`, `calendar-date`, `url`, `path`, `region`, `file` and `none`, and holds no entry for `json`, `template`, `relation-name` or `string`. `armRule` at `page/property/value.ts:268` answers a miss with a null rule and a reason naming the type as one this states no rule for, which is what `judge.ts:137` pushes onto `unjudged`. `json`, `template` and `relation-name` each stand as a declared type page under `pages/page-property-type/`; `string` has no such page; `text | list(text)` stands as the type of one property definition, `pages/page-property-definition/page-query-test-contains.page-property-definition.md`. Why that union reads as unjudged when `text` carries a rule and `list(...)` is a wrapper the grammar handles, I did not establish.

The `json` entry was deliberately not landed, on Zero At Landing — where zero is out of reach, do not land it.

Three findings already stand nearby. `pages/finding/pages-system/property-types-open-but-rules-closed.finding.md` records the earlier state, in which the unjudged set was at least printed on the gate PASS line; it is now printed nowhere. `pages/finding/pages-system/unbound-types-are-the-value-model-gap.finding.md` argues the missing rules are what admits a structured value into frontmatter at all, and is the counter-argument to weigh before filling any of them in — though its argument rests on a rule being handed text alone, and today `Rule.holds` takes the value and calls `wrongShape` itself at `page/property/value.ts:63`, `:89` and `:107`, so that part may have been overtaken. `template` alone is already carried by `pages/finding/page-property-definition/template-is-a-type-nothing-rules.finding.md`.

Not measured here: I did not run the gate over the corpus, so 640, 5,325, 127 and 4,558 are that reading rather than mine, and I did not check whether any of the 127 attachment keys would be wrongly refused by some other route.
