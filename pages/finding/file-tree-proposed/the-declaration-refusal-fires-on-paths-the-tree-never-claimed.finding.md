---
page-type-slug: finding
title: "The declaration refusal fires on paths the tree never claimed"
domain-slug: domain/file-tree-proposed
---

# Claim

`declaredOver` at `page/property/declarations.ts:149-162` refuses a whole property reading when it cannot open a path, and `readDeclarations` at `:164` keeps that first fault in place of the set.

The warrant was a tree contradicting itself: the list came from `tree.paths(...)`, so a tree listing a path and then answering null for it had said two things. `014a2c82d` made the list `indexedPaths` and left the refusal alone. A path the index alone supplied was never the tree's claim.

# Evidence

Measured 2026-08-28 against `main`.

The message stands at six sites: `declarations.ts:155`, `frontmatter.ts:157`, and `page/shape/chain.ts:27`, `:57`, `:80`, `:86`. Searched across every `.ts` and `.md`, it appears nowhere else — no test asserts it, and the only page naming it is this one. Six live refusals are held by nothing.

The warrant is legible in the original. At `816c4d622` `declaredOver` read `for (const relPath of tree.paths(PROPERTY_GLOBS))` with the same guard and fault beneath it. `014a2c82d` replaced that line with `indexedPaths(...)` and changed nothing below. The guard at `:150` — `tree.root === undefined || (tree.pending?.size ?? 0) > 0` — was already true for every composed tree, so it began firing at once: 2288 index paths against a fixture holding 21.

Which sites the split reached, measured 2026-08-28, answering what stood open here. **Two of six.** `frontmatter.ts:157`, whose `at` walks `typeIndex(tree)` built from `registryOf` and so from `indexedPaths`; and `chain.ts:86`, whose path is the `PageType.relPath` off that same registry. The other four take the tree's own claim, through `shapeAt` at `chain.ts:43`, which is still `tree.paths(globsIn(...))` — body shapes were never moved onto the index. Two of those four cannot fire as written: `chain.ts:27` and `:80` re-open a path their caller has already opened non-null.

The guards differ. `declarations.ts:150` records the fault only where `composed`; `frontmatter.ts:157` and `chain.ts:86` refuse unconditionally; `f81673e20` protects `indexedPaths` by `tree.root`. Three tests stand in front of one message.

The removal case does not reach it and did not before: `tools/page/page-file-tree.ts:37` filters removals out of `paths`, and the gate tree's `open` reads from disk. The deriver reads through this refusal as of `b2a08142e` and does not fire it either, `diskFileTree` giving an empty `pending` and a defined `root`.

`f81673e20` stopped the false positives and left the warrant alone.
