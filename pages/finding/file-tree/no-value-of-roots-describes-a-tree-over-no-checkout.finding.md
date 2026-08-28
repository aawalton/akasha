---
page-type-slug: finding
title: "No value of roots describes a tree over no checkout"
domain-slug: domain/file-tree
---

# Claim

`FileTree.roots` is optional, and three readers take its absence to mean three different things.

- `reposRead` at `page/property/frontmatter.ts:33` — absent means akasha alone.
- `indexedPaths` at `page/property/registry.ts` — absent meant every repository the pages index carries, unfiltered.
- `globsIn` at `page/page-types.ts:240` — absent means the literal `pages/<place>/` folders, and stating it widens the search to `**/` anywhere.

Omitting the field therefore reads narrower in one place and wider in another. Whoever leaves it out is making three claims at once and can hold at most one of them in mind.

The sharper trouble is that for one real object no value of it is right. `tools/tests/page-frontmatter-fixture.ts` builds an akasha tree of twenty-one files held in memory. Absent `roots` is correct for `reposRead` and wrong for `indexedPaths`. `{}` is correct for `indexedPaths` and makes `reposRead` answer that no repository stands here, which refuses the whole vocabulary. Naming akasha at any path admits every index entry, because every entry carries the repo `akasha`. The tree is an akasha tree that is not the akasha on disk, and `FileTree` has no way to say that.

A field with no value expressing what the object is. The repair is a shape change — `roots` required, with an explicit spelling for a tree standing over no checkout — and a shape change is Alan's rather than a worker's.

# Evidence

Measured 2026-08-28 against `main`.

The type admits all of it. `page/page.ts:3` declares `Roots = Readonly<Record<string, string | undefined>> & { readonly target?: Repo }` — an open record of optional strings, so an absent field, an empty record and a misspelled key all typecheck alike.

Two constructors over the same argument disagree. `builtDiskTree` at `page/file-tree.ts:30-39` takes `Roots` and does not pass it on; `builtSpanningTree` at `page/file-tree.ts:56-66` takes the same `Roots` and sets `roots` on the tree. They differ in nothing else that bears on this. So two trees built from one set of repositories answer the three readers above differently, and neither constructor says why.

The three repairs tried on the fixture, each applied in a scratch materialisation of the tree and run rather than reasoned about:

`roots: {}` clears the fault and breaks eleven further cases across the three suites, all of them `vocabularyOf` refusing at `page/property/frontmatter.ts:45-56` with ``\`page-property-type\` claims its files in \`akasha\`, which nothing here reads — no repository stands here``, once `reposRead` answers an empty list.

`rootsNamed({ akasha: <temp dir> })` is strictly worse. `indexedPaths` skips an index entry only where `tree.roots[one.repo] === undefined`, and every line in `.git/pages/index/pages.jsonl` carries `akasha`, so naming akasha at any path at all admits all 2288 property definitions.

Suppressing the refusal instead of stating the roots does not reach it either: `tools/tests/property-types-bind.test.ts:82` asserts `measured.properties` is 7, and that count is the length of the raw `indexedPaths` result, so the fixture must not draw the index at all rather than merely tolerate it.

Population. Of the six modules that build a `FileTree` carrying a `pending` set, `tools/tests/page-frontmatter-fixture.ts` and `tools/tests/page-uncommitted-keys.test.ts` name no `roots`, and neither does `tools/page/page-file-tree.ts`, which is the tree every akasha gate judges a write through. The gate tree is right to omit it, because it stands over the akasha the index was built from; the two fixtures are not, and nothing distinguishes the three cases at the point of writing.

Repaired for the symptom at `f81673e20`, which keeps the index out of a tree that does not stand over the checkout it was built from. That closes the instance and leaves the field as it was.

Not measured: whether readers of `Roots` outside `page/property/` take a fourth reading of the absent field.
