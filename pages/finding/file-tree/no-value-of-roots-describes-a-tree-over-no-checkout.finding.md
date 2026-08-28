---
page-type-slug: finding
title: "No value of roots describes a tree over no checkout"
domain-slug: domain/file-tree
---

# Claim

`FileTree.roots` is optional, and three readers take its absence to mean three things. `reposRead` at `page/property/frontmatter.ts:33` reads akasha alone. `indexedPaths` at `page/property/registry.ts:106` reads every repository the index carries. `globsIn` at `page/page-types.ts:240` reads the literal `pages/<place>/` folders, where stating it widens to `**/`.

For one real object no value is right, so the repair is a shape change.

# Evidence

Measured 2026-08-28 against `main`.

The type admits all of it. `page/page.ts:3` declares `Roots` an open record of optional strings, so an absent field, an empty record and a misspelled key typecheck alike; `page/file-tree.ts:14` makes `roots` itself optional, a fourth state.

Two constructors over the same argument disagree. `builtDiskTree` at `page/file-tree.ts:30-39` takes `Roots` and drops them; `builtSpanningTree` at `:56-66` takes the same and sets them, and the only line between them bearing on this is `roots,`. So every `diskFileTree` caller gets a tree answering "akasha alone" to `reposRead`, whichever repositories it passed.

No value fixes the fixture. `tools/tests/page-frontmatter-fixture.ts` holds twenty-one akasha files in memory. Absent `roots` suits `reposRead` and not `indexedPaths`. `{}` suits `indexedPaths` and makes `reposRead` answer that no repository stands here, breaking eleven cases at `frontmatter.ts:45-56`. Naming akasha at any path admits all 2288 property definitions, every index line carrying `akasha`. Suppressing the refusal misses too: `tools/tests/property-types-bind.test.ts:84` asserts `measured.properties` is 7, the length of the raw `indexedPaths` result.

Population, widened 2026-08-28, which corrects the count. Six modules build a `FileTree` carrying `pending`, and **five name no `roots`**: `builtDiskTree`, `tools/page/page-file-tree.ts:23-43`, `tools/tests/page-frontmatter-fixture.ts:80-90`, `tools/tests/page-uncommitted-keys.test.ts:47` and `page/property/type-cache.unit.test.ts:43-45`. The gate tree is right to omit it, standing over the akasha the index was built from; the fixtures are not. `page-uncommitted-keys` inherits the omission, spreading `diskFileTree(ROOTS)`.

Repaired for the symptom at `f81673e20`, which keeps the index out of a tree not standing over its checkout, leaving the field as it was.

Not measured: whether readers of `Roots` outside `page/property/` take a fourth reading of the absent field.
