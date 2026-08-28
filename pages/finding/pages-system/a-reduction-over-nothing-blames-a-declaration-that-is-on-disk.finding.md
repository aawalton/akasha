---
id: 2e19225c-f49a-4fac-9ac9-415888662e1e
slug: a-reduction-over-nothing-blames-a-declaration-that-is-on-disk
page-type-slug: finding
title: "A reduction over nothing blames a declaration that is on disk"
domain-slug: domain/pages-system
---

# Claim

`answer(roots, { pageType: "readout-scale", function: "sum", target: "green-at" })` returns `n: 12, value: null, over: 0` with the fault "`green-at` is the property this query reduces and no property declares it on `readout-scale`, so a number here would have been reduced over nothing". The declaration stands on disk at `readouts/scale/readout-scale-green-at.page-property-definition.md:7`, `type: number`, and parses correctly. The reader that misses it — `declarationsIn`, `tools/lib/page-declared.ts:182-200` — never consults the page index under any circumstance, so `ops index refresh` cannot change this answer. It reaches its files through `scanIn` with folder-anchored globs, and the eleven page types filed beside their own domains put 57 property declarations outside those folders. The rows are not missing: every `green-at` value is already on its row, and only the declaration that says the key is a number is out of reach, so the reduction refuses over data it is holding. The write path was repaired for exactly this at `014a2c82d` and the deriver was not, so the two readers of one store now disagree by 57 keys.

# Evidence

Measured 2026-08-27 against akasha at `b903c87b2`, by running the shipped `answer`, by differencing the two path sources, and by an A/B of the deriver against one instant of the tree.

`PROPERTY_GLOBS` (`page/page-types.ts:27-30`) names `pages/page-property-definition/` and `pages/alan-harness-tracking-field/`. `scanIn(declaringRoot(roots), PROPERTY_GLOBS)` returns 2,231 paths, none under `readouts/` or `graph/`. Walking the index for the same two kinds — `one.repo === AKASHA && PROPERTY_KINDS.has(one.type)` — returns 2,288. All 57 in the difference are index-side; the glob scan finds nothing the index misses.

Passing the `repo` argument does not close the gap. `scanIn(root, PROPERTY_GLOBS, "akasha")` also returns 2,231: `scannedFromIndex` (`page/index/scan/scan.ts:19-43`) does consult the index once given a repo, but matches the same folder-anchored globs against the index keys, so the index is asked the folder question rather than the kind question. The omitted argument at `tools/lib/page-declared.ts:186` is real and worth closing; it is not what causes this.

The 57 keys, by page type: `graph-edge` 4, `graph-edge-attribute` 1, `graph-edge-producer` 3, `graph-node` 2, `graph-node-attribute` 1, `graph-node-deriver` 2, `graph-node-producer` 3, `readout` 20, `readout-group` 3, `readout-scale` 7 (`black-at`, `blue-at`, `earned-color-slug`, `green-at`, `orange-at`, `red-at`, `yellow-at`), `readout-widget` 11. One file each: 57 files, 57 keys.

The same shape stands one function above and is already solved there. `pageTypePathsIn` (`tools/lib/page-declared.ts:105-112`) reads page-type paths off the index by kind and falls back to the glob scan only where the index does not describe the root; its comment names these same eleven types. `page/property/registry.ts:85-101` generalises that as `indexedPaths`, and `page/property/declarations.ts:152` — a second reader of the very same declarations, repaired at `014a2c82d` — already uses it.

What the missing declarations would change was measured by holding both declaration sets against one instant of the tree, priming each into `holdInCall` and running the deriver over 61 page types: every type whose extends-chain meets one of the eleven, plus 48 sampled that do not. Running the first set twice around the second caught the tree moving under the measurement on exactly one page type, `subagent`, which is in the sampled set and not in the result. Four page types move: `readout`, `readout-group`, and — through `extends-slug: readout` — `persona` and `value`. **No value of any key that a row already carries changes anywhere.** The whole movement is keys that were absent appearing with the default their declaration states: `day-kind: wake-day`, `drawn-as: stoplight`, `enabled: true`, `figure-format: integer`, `figure-off-scale: false` on 41 persona and 16 readout pages, four of those five on 6 value pages, and `sort-order: label` on 4 readout-group pages. `readout-scale`, `readout-widget` and the seven `graph-*` gain no key at all — their declarations carry no defaults — which is why the `green-at` sum is a pure type lookup: the values were always there.

The same folder-anchored assumption stands a third time at `tools/lib/page-type-repo.ts:27`. `repoHolding` derives `pages/page-type/<slug>.page-type.md`, finds no file for a page type filed beside its own domain, and falls through to `repoPlacings`, which reads the `pages/` directory and cannot know about it either. Against `soleRepoOf` over the 393 page types in the registry it disagrees on exactly 11 — `readout`, `readout-group`, `readout-scale`, `readout-widget` and the seven `graph-*` — answering `null` where the registry answers `akasha`, and agreeing on the other 382.

Five of the fourteen `scanIn` call sites omit `repo`, which silently means do not consult the index: `tools/lib/page-declared.ts:106` and `:186`, `tools/lib/rules-engine-rule-set.ts:18` and `:82`, `tools/lib/gate-judgement.ts:14`. Only `:106` omits it deliberately, behind a guard that has already established the index does not reach. A default that reads as an argument nobody needed, and means an index nobody read, is how three separate readers came to disagree with the store without any of them saying so.
