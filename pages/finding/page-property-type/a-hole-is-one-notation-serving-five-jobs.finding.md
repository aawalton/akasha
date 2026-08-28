---
page-type-slug: finding
id: 8a17ce86-361a-4203-b6f7-1f387d711335
title: "A hole is one notation serving five jobs"
slug: a-hole-is-one-notation-serving-five-jobs
domain-slug: page-type/page-property-type
---

# Claim

A hole marked `{name}` is not one concept spelled three ways. It is one notation serving five jobs, written as eight expressions in first-party code. The three the earlier finding named differ only over what a hole's name may be, never over the carrier. Nothing in the corpus is dotted and nothing judges the one dotted default, so bounding the name would refuse no value that exists. `unique-key` is rendered by nothing, and an initiative already rules that it and `named-for` both go.

# Evidence

Eight expressions. `named-for/named-for.ts:9` is `/\{([a-z0-9-]+)\}/g`. `page/document/template.ts:5` is `/\{([a-z][a-z0-9-]*)\}/g` and `:7` `ONE_HOLE` anchors it. `page/document/holes.ts:6` is `/\{([^{}]*)\}/g`, exported and already shared with `refusal/refusal.ts:3`. `page/property/template.ts:4` repeats it. `page/property/value.ts:20` `BACK_REFERENCE` repeats `ONE_HOLE`. `page/index/link/link.ts:7` `SLOT` and `tools/lib/links.ts:12` `SLOT_RE` repeat each other.

Five jobs: filling a refusal body, compiling a body-shape slot, rendering a `named-for` stem, bounding a `template` value's carrier, and marking a whole string as a placeholder rather than a path.

A dotted hole is not refused but absorbed. `filledBy("{page-type.slug}/{slug}", ...)` returns `page-type-slug-my-page`: the unseen hole becomes literal words in the name.

The corpus is uniformly kebab. All 109 `named-for:` values, all 115 distinct brace-pairs across 157 refusal pages, and every brace in the 21 files carrying `slots:` are plain kebab names. `page/property/judge.ts` reads no `default`, and no page carries a `unique-key:` key, so `{page-type.slug}/{slug}` reaches no rule.

Every `unique-key` in code is prose, one fixture, or the promoted column at `tools/lib/tracking/held-row.ts:19`. The same search for `named-for` returns a constant, a renderer, a check and an audit.

`pages/page-property-definition/refusal-holes.page-property-definition.md:7` states `type: list(slug, max 8)`, so a name grammar is already stated per property, in data.

`pages/initiative/astra-page-naming.initiative.md:15,29,33` already rules that `named-for` and `unique-key` cease to exist.
