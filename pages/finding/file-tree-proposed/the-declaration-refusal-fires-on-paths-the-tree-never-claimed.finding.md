---
page-type-slug: finding
title: "The declaration refusal fires on paths the tree never claimed"
domain-slug: domain/file-tree-proposed
---

# Claim

`declaredOver` at `page/property/declarations.ts:149-162` refuses a whole property reading when it cannot open a path, with ``\`X\` is not in the repo this call would produce``. One unopenable path discards every declaration the tree holds, because `readDeclarations` at `:164` keeps the first fault and returns it in place of the set.

The warrant for that refusal was a tree contradicting itself. The path list came from `tree.paths(...)`, so a tree that listed a path and then answered null for it had said two things, and refusing was right.

`014a2c82d` changed where the list comes from and left the refusal as it stood. The list is now `indexedPaths`, a union of the pages index, the tree's own globs and its pending set. A path drawn from the index alone was never claimed by the tree, so a null `open` there is not a contradiction — it is the index carrying something this tree does not. The refusal now straddles two sources and means a different thing on each.

Nothing holds either reading. No test asserts the message and no page names it, so both the case it was written for and the case it acquired are unstated.

# Evidence

Measured 2026-08-28 against `main`.

The message stands at three sites — `page/property/declarations.ts:155`, `page/property/frontmatter.ts:157` and `page/shape/chain.ts:27`, `:57`, `:80`, `:86`. Searched across every `.ts` and `.md` in the tree, it appears nowhere else: no test asserts it and no page names it.

The warrant is legible in the original. At `816c4d622`, where these declarations were moved to their present file, `declaredOver` read `for (const relPath of tree.paths(PROPERTY_GLOBS))` with the same `composed` guard and the same fault beneath it. The list and the `open` were one source, and disagreement between them was the tree contradicting itself.

`014a2c82d` replaced that line with `indexedPaths(tree, PROPERTY_KINDS)` and changed nothing below it. The guard at `:150` — `tree.root === undefined || (tree.pending?.size ?? 0) > 0` — was already true for every composed tree, so the refusal began firing at once on paths supplied by the index. Against `tools/tests/page-frontmatter-fixture.ts` that was 2288 paths against a tree holding 21, and the first of them by sort order, `graph/edge-attribute/graph-edge-attribute-slug.page-property-definition.md`, is the one every one of the nine broken suites reported.

The removal case, which is what the union was reasoned about, does not reach the refusal and did not before. `tools/page/page-file-tree.ts:37` filters removals out of `paths`, so a path this write takes away was never in the pre-change list; and the gate tree's `open` reads from disk, where the file still stands until the commit lands. So the refusal has no observed firing on a real gate: `composed` is true for the gate tree, and its `open` answers for every indexed path.

`f81673e20` stopped the false positives by keeping the index out of a tree that does not stand over the checkout it was built from. It did not settle what the refusal is for, and deliberately left the warrant alone.

Not measured: whether the five sites in `page/shape/chain.ts` draw their paths from one source or two, and so whether the same split reached them.
