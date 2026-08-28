---
id: 2e19225c-f49a-4fac-9ac9-415888662e1e
slug: a-reduction-over-nothing-blames-a-declaration-that-is-on-disk
page-type-slug: finding
title: "A reduction over nothing blames a declaration that is on disk"
domain-slug: domain/pages-system
---

# Claim

A correct claim was overturned by a wrong correction, which was relayed with confidence because it had a mechanism attached. That is the sharpest form the failure takes: a bare wrong claim is doubted, and a wrong claim carrying an explanation of itself is not. The instance: `answer(roots, { pageType: "readout-scale", function: "sum", target: "green-at" })` answered `n: 12, value: null, over: 0` and reported `green-at` as declared by no property, while `readouts/scale/readout-scale-green-at.page-property-definition.md:7` said `type: number` on disk. One agent found the cause — a folder-anchored glob. A second overturned that with an omitted `repo` argument at `tools/lib/page-declared.ts:186`. Measured, the argument makes no difference at all: 2,231 paths either way. The first agent was right, and the correction was the error. What makes the wrong correction plausible is worth keeping even though the defect is repaired: naming the repository does not reach these files, because `scannedFromIndex` matches the same folder-anchored globs against the index keys, so the index is asked the folder question rather than the kind question. Repaired at `54c99c72f` by reading the index by kind; `repoHolding` and the `scanIn` signature at `14ab92b7f`.

# Evidence

Measured 2026-08-27 against akasha at `b903c87b2`, by running the shipped `answer`, by differencing the two path sources, and by an A/B of the deriver against one instant of the tree.

`PROPERTY_GLOBS` (`page/page-types.ts:27-30`) names `pages/page-property-definition/` and `pages/alan-harness-tracking-field/`. `scanIn(declaringRoot(roots), PROPERTY_GLOBS)` returned 2,231 paths, none under `readouts/` or `graph/`. Walking the index for the same two kinds — `one.repo === AKASHA && PROPERTY_KINDS.has(one.type)` — returns 2,288. All 57 in the difference are index-side; the glob scan finds nothing the index misses.

`scanIn(root, PROPERTY_GLOBS, "akasha")` also returned 2,231, which is the measurement that settles it. `scannedFromIndex` (`page/index/scan/scan.ts`) does read the index once given a repository, and then matches these same folder-anchored globs against the index keys. So the argument decides which source answers, and the glob decides what either source can say; only the second was ever the fault. The omitted argument was real and worth closing on its own account, and closing it moved nothing.

The 57 keys, by page type: `graph-edge` 4, `graph-edge-attribute` 1, `graph-edge-producer` 3, `graph-node` 2, `graph-node-attribute` 1, `graph-node-deriver` 2, `graph-node-producer` 3, `readout` 20, `readout-group` 3, `readout-scale` 7 (`black-at`, `blue-at`, `earned-color-slug`, `green-at`, `orange-at`, `red-at`, `yellow-at`), `readout-widget` 11. One file each: 57 files, 57 keys. A third reading of 54 files was wrong; it is 57.

The rows were never missing. Every `green-at` value stood on its row, and only the declaration saying the key is a number was out of reach, so the reduction refused over data it was already holding. After the repair the same call answers `value: 630` over 10 of the 12 rows with no fault, and removing that one declaration brings the identical fault back — so the refusal is awake rather than merely silent for a new reason.

What the missing declarations changed was measured by holding both declaration sets against one instant of the tree, priming each into `holdInCall` and running the deriver over 61 page types: every type whose extends-chain meets one of the eleven, plus 48 sampled that do not. There is no before and after in this method, so a corpus moving under a measurement cannot contaminate it — and running the first set again after the second caught the tree moving on exactly one page type, `subagent`, which is in the sampled set and not in the result. Four page types move: `readout`, `readout-group`, and through `extends-slug: readout`, `persona` and `value`. No value of any key that a row already carries changes anywhere, and no page appears or leaves. The whole movement is keys that were absent standing with the default their own declaration states: `day-kind: wake-day`, `drawn-as: stoplight`, `enabled: true`, `figure-format: integer`, `figure-off-scale: false` on 41 persona and 16 readout pages, four of those five on 6 value pages, and `sort-order: label` on 4 readout-group pages. `readout-scale`, `readout-widget` and the seven `graph-*` gain no key at all, their declarations carrying no defaults, which is why the `green-at` sum is a pure type lookup.

`page/property/declarations.ts:152` — a second reader of these same declarations — was repaired this way at `014a2c82d` and the deriver was not, so for a time the write path could see all 57 and every query could see 2,231. Two readers of one store disagreeing is what the repair closed; it is a convergence rather than a change.

Five of the fourteen `scanIn` call sites omitted `repo`, which silently meant do not consult the index: `tools/lib/page-declared.ts:106` and `:186`, `tools/lib/rules-engine-rule-set.ts:18` and `:82`, `tools/lib/gate-judgement.ts:14`. Only `:106` omitted it deliberately, behind a guard that had already established the index does not reach. A default that reads as an argument nobody needed, and means an index nobody read, is how three separate readers came to disagree with the store without any of them saying so.
