---
id: dd5be988-f5f3-5506-a699-eb53e44b74b6
page-type-slug: finding
slug: two-loaders-read-one-declaration-set
title: "Two loaders read the same property declarations into two record types, and both call the result Declarations"
domain-slug: domain/page-types-system
---

# Claim

`tools/lib/page-declared.ts` and `page/property/declarations.ts` each scan every page matched by `PROPERTY_GLOBS` and build one record per declaration, into two unrelated shapes. Both export an interface named `Declarations` carrying a field named `bySlug`, and the two `bySlug` maps are keyed by different things: the property's own slug in one, the page type's slug in the other. The two paths split by consumer — the deriver reads the first, the write path reads the second through `tools/lib/page-property-types.ts` — so which answer a caller gets depends on which door it came in by, and the type names give no warning that there are two.

# Evidence

Read on 2026-08-27 against `31ff5657` on `main`. Not run: I read the code and traced its importers, and measured no case where the two disagree on a real page.

**They read the same files.** `tools/lib/page-declared.ts:162` scans `scanIn(declaringRoot(roots), PROPERTY_GLOBS)`. `page/property/declarations.ts:136` iterates `tree.paths(globsIn(tree.roots, PROPERTY_GLOBS))`. `PROPERTY_GLOBS` is one export at `page/page-types.ts:27-30`, naming the `page-property-definition` and `alan-harness-tracking-field` places. So the input set is not merely similar; it is the same constant.

**They build two records.** `page-declared.ts:52-70` declares `Declared` with seventeen fields — `type`, `target`, `fallback`, `expression`, `relation`, `reduction`, `over`, `attachment`, `rows`, `uncommitted`, `computed` and the rest. `page/property/property.ts:3-29` declares `Property` with twenty-eight, overlapping on `type`, `target`, `rows`, `uncommitted`, `computed`, `from`, `back`, `expression`, `relation`, `reduction`, `over`, `attachment` and `slugProperty`, and spelling the default `default` where the other spells it `fallback`. Neither type is derived from or converted to the other anywhere.

**Both name the result Declarations.** `page-declared.ts:72-75` exports `Declarations { byKind, bySlug }` where `bySlug` is `Map<string, Declared>` filled at line 171 from `one.slug`, the property's own slug. `page/property/declarations.ts:39-42` exports `Declarations { bySlug, fault }` where `bySlug` is `Map<string, readonly Property[]>` consumed at `page/property/frontmatter.ts:191-192` by `stemOf` of a page-type file path, so it is keyed by page-type slug. Two exported types, one name, one field name, two keyings.

**The split is by consumer, not by question.** `page-declared.ts` is imported by `page-derive.ts:13`, `page-derive-backing.ts:1`, `page-reach.ts:1` and `page-code-values.ts:2` — the deriver — and by one test. `page-property-types.ts`, 128 lines, is imported by `page-write.ts:9`, `page-write-compose.ts:10`, `page-write-values.ts:12`, `page-write-text.ts:4`, `page-compare.ts:7`, `page-uncommitted-keys.ts:2`, `page-attachment-keys.ts:3` and `temper-addon-data/pages-bridge.ts:6` — the write path. It holds no scan of its own: `declarationsFor` at line 18 calls `registryOf` from `page/property/registry.ts` and `compiledPageTypeFor` from `page/property/frontmatter.ts`, which is what reaches `declarations.ts`.

**Awareness is partial, and only on the page-type half.** `page-declared.ts:91-102` carries a comment naming `pageTypePaths` in `page/property/registry.ts` and adopting its fix — read page types off the index rather than the glob, because the glob named `pages/page-type/` alone and "the two answers to what page types exist disagreed". That repair landed on `kindsIn` only. `declarationsIn` at line 162 still globs the property pages directly, so the disagreement the comment describes is fixed for page types and untouched for properties.

**They are not the same function.** `declarationsIn` groups by the type each property was declared on and resolves no inheritance. `declarationsFor` resolves the extends chain through `compiledPageTypeFor` and keeps the nearest declaration per key (`page-property-types.ts:23-33`). So this is two answers to overlapping questions rather than one answer computed twice, which is why nothing has yet caught them drifting.

Not measured: whether the two disagree on any page standing today, and whether the deriver needs a shape the compiled path cannot give.
