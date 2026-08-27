---
id: da8bf8f5-1671-5edf-8ee7-22f5a824969e
page-type-slug: finding
title: "Value carries a points mapping that no file states"
domain-slug: domain/pages-system
---

# Claim

Alan's six values each carried `valueProp` — the daily-tracking level field the value scores against — and `totalPoints`, an accumulated total. Neither is on any of the six files, and `properties/` declares only colour, description and sort order. The descriptions survived and were the thing checked; the mapping beside them was not. Five of six descriptions are byte-exact and the sixth differs by one trailing newline, so a description check passes while the other two keys disappear.

# Evidence

Measured 2026-08-20 against `DATABASE_ADHOC_URL` and the live query service. The `value` row was soft-deleted at 14:30:10 with 6 pages live at retirement; the files at `instructions:domains/alan-values/*.md` answer n=6.

The row values, none of which any file states:

- love → `valueProp: loveLevel`, `totalPoints: 45800.27643333334`
- health → `healthLevel`, `26.505674603174604`
- faith → `faithLevel`, `429.3146275`
- learn → `learnLevel`, `41.3633`
- wealth → `wealthLevel`, `482602.6130961086`
- fun → `funLevel`, `6533.94563`

`grep -rn "value-prop\|total-points" domains/alan-values/` returns nothing.

The description comparison, row against file, byte for byte: faith 106/106, fun 143/143, health 88/88, learn 85/85, love 119/119 all exact; wealth is 178 on the row against 177 on the file, the difference being a single trailing `\n`. So the "carried byte-exact" claim holds for the text and says nothing about the other keys on the same rows.

Two more keys read as lost and are not: `personas` (6) and `childValues` (5) are the mirror halves of `persona.value-slug` and `value.domain-parents-slugs`, both of which the files carry, so the edges are recoverable by inversion rather than stated.

`value.color` has a property document that states no `values:` list, so its six options — purple, red, blue, green, yellow, orange — go the same way as the other option lists.
