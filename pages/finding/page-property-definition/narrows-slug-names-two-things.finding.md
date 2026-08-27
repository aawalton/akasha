---
id: b7f707f2-a824-51c1-ad94-5e10aed5c1d4
slug: narrows-slug-names-two-things
page-type-slug: finding
title: "Narrows slug names two things"
domain-slug: page-type/page-property-definition
---

# Claim

`narrows-slug` names a page type in code and a property definition in its own words, and four files sit on the losing side of that with nothing reporting it.

# Evidence

`properties/page-property-definition-narrows-slug.md:14` defines the key as "the declaration a property tightens", which reads as naming another property definition.

`redeclaration` at `tools/lib/page-frontmatter.ts:264-282` resolves it the other way: it checks `on.has(one.narrowsSlug)`, where `on` is the set of `defined-on-slug` values on the competing declarations. Those values are page type slugs, never property slugs.

Six files state the key. Two take the page type form and resolve:

- `properties/ops-command-instructions-path.md` — `narrows-slug: domain`
- `properties/agent-hook-instructions-path.md` — `narrows-slug: domain`

Four take the property form and are rejected by that same function:

- `properties/persona-group-slugs.md` — `narrows-slug: readout-group-slugs`
- `properties/persona-scale-slug.md` — `narrows-slug: readout-scale-slug`
- `properties/persona-source-slug.md` — `narrows-slug: readout-source-slug`
- `properties/persona-unit.md` — `narrows-slug: readout-unit`

Each of the four would resolve if it stated `narrows-slug: readout`.

Nothing reports the four. `redeclaration` only runs where two declarations compete for one key on one chain, and `pages-hold-properties` counts a page as unjudgeable rather than refused, so its 41 advisory lines are a different fault.

Which side is wrong is not settled here: the key's own definition and the resolver each read as the intended one.
