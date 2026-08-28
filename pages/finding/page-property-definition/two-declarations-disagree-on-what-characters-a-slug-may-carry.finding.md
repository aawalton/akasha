---
id: bceefdaf-6dfb-495a-a4a5-4d2b75c1537b
slug: two-declarations-disagree-on-what-characters-a-slug-may-carry
page-type-slug: finding
title: "Two declarations disagree on what characters a slug may carry"
domain-slug: page-type/page-property-definition
---

# Claim

`page-slug.page-property-definition.md:20` says a slug carries whatever characters the name it is written from carries. `slug.page-property-type.md:13` defines the slug type as a name written in lower-case words joined by hyphens. Anything pointing at a page is checked against the second, so a page may hold a slug nothing is permitted to point at. Both lines need Alan to change, and no implementation settles which is meant. Two rows turn on it, so the decision is cheap and nothing large waits on it.

# Evidence

Verbatim. `pages/page-property-definition/page-slug.page-property-definition.md:20`: "A slug carries whatever characters the name it is written from carries." `pages/page-property-type/slug.page-property-type.md:13`: "Slug, a name written in lower-case words joined by hyphens." The system holds both answers at once: the same `page-slug` page declares `type: text` at line 7, so a page's own slug is unconstrained as implemented, while a `relation-slug` value is checked against the slug type at `page/document/value.ts:6`. Permissive where a slug is stated, restrictive where one is pointed at.

Neither line is an agent's to change. Both page types carry `extends-slug: domain`, so each page is a domain; `slug.page-property-type.md:13` is a Definition line and `page-slug.page-property-definition.md:20` a Design line, which is a domain invariant. `pages/page-type/domain.page-type.md:53` covers both: show Alan each line you change in a domain's Definition, Invariants, or Directives, a wrong one being obeyed rather than caught.

No implementation settles it. `pages/domain/language-conformance.domain.md:23` says never settle a question by reading the code; `:27` and `:33` hold every implementation to the written meaning and never make one the reference. The two regexes agree with each other, which is not evidence.

The stakes are 2 rows, not 95,339. Measured 2026-08-28, 95,337 display labels and capitalised names in the same population are wrong under either reading and are a separate problem. Only 2 values turn on this. `world-mechanic-reading.mechanic-slug` holds `剑圣-心火之刃`, the stated slug of a real page at `pages/spell/the-wandering-inn/剑圣-心火之刃.spell.md:5`, pointed at from `world.mechanic-readings.jsonl:11354`; `character-reading.character-slug` holds `伶央`. Read restrictively, both pages are invalid and renamed, as is any page whose name is not ASCII. Read permissively, the slug type's Definition is rewritten and every reader inheriting kebab from it loses that.
