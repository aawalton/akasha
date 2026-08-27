---
id: 905fb931-3385-553f-b37b-fabc7f23930a
page-type-slug: finding
title: "Template is a type nothing rules"
domain-slug: page-type/page-property-definition
---

# Claim

Two property definitions state `type: template`, and `page-value.ts` states no rule for that type, so neither property's value is ever judged.

# Evidence

`properties/page-body.md:7` and `properties/page-type-unique-key.md:7` both state `type: template`.

`RULES` at `tools/lib/page-value.ts:177-206` names `slug`, `text`, `uuid`, `relation-id`, `relation-seq`, `relation-slug`, `boolean`, `number`, `size`, `instant`, `calendar-date`, `url`, `path`, `region` and `none`. `template` is not among them.

`armRule` at `tools/lib/page-value.ts:283-284` answers a miss with `rule: null` and the reason "`template` is a type this states no rule for", which leaves the page unjudgeable rather than refused. Nothing reports the two.

The two hold different shapes under the one name. `page-type-unique-key` holds a string of dotted placeholders, defaulting to `{page-type.slug}/{slug}`. `page-body` holds a whole markdown document, and its own Design says "A page body holds nothing its shape does not allow" — a bound that lives in the body shape rather than in the type.

Which of the two `template` is meant to describe is not settled here.
