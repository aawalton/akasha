---
id: b5d390d4-2ead-4468-a2cb-e217f461794c
page-type-slug: finding
title: "The relation index names a path end but no attachment end"
domain-slug: graph-system
slug: relation-index-holds-no-non-page-end
---

# Claim

The pages relation index already names an end that is no page. Where a property's type is a path, the index files the edge under the target's own path — `relation/{property}/{repo}/{path}.jsonl` — and this works today. What it holds nothing for is an attachment: the producer derives those from the naming convention rather than from a declared target, so no entry is ever written for one. The gap is attachments, not non-pages, and it is about 4,880 edges including all 61 `code` relations, which is how a page names its own implementation.

# Evidence

Measured on 2026-08-27 in akasha, over the whole repository.

Comparing page-to-page relations as sets rather than counts: one walk over all 89,648 file nodes derives 116,609 edges in 2.0s, the index holds 119,973 entries read in 0.12s, 0 edges are in the walk and not the index, and 3,364 are in the index and not the walk. So for page ends the index is a strict superset and answers 17 times faster.

5,300 relation edges reach a file carrying no page type. Of those, the path-typed properties are indexed: `script` 95 and `widget-path` 6 under `relation/{property}/akasha/{path}.jsonl`, and `command-path` 317 under the same shape. The attachment-typed properties have no directory in the index at all — `code`, `lyrics` 1,372, `synced-lyrics` 1,340, `data` 455, `stack` 324, `context` 260, `passage-text` 255, `effects` 132 and `description` 63 each return nothing.

All 317 `command-path` entries are filed under repo `instructions`, which no longer exists since the fold into akasha, so a lookup keyed on `akasha` reaches none of them. `script` and `widget-path` are filed under `akasha` and are current.

The walk derives 8 `widget-path` edges where the index holds 6. Two `readout-widget` pairs share a key that `tools/required-reading.ts` stores with a plain set, so one page of each pair is displaced, which is the likely cause and is not confirmed.

# Corrected

An earlier version of this finding claimed the index could hold no non-page end at all, on the ground that its files are named for a page's stem and type. That was wrong: it was measured by comparing only targets that resolved to a page, which excluded from the comparison the very entries that would have disproved it. The nested directories under `command-path`, `script` and `widget-path` were visible in the same walk and were read as an obstacle to parsing rather than as the answer.

# Not measured

Whether the 3,364 surplus page-to-page entries are all body-derived links, or whether some are frontmatter relations the producer fails to derive, which would make them a defect rather than a difference in scope.

Whether anything reads the stale `instructions`-keyed `command-path` entries today, and so whether their being unreachable has cost anything yet.

# Design note

`EdgeProducer.into` must answer completely for the kinds its producer claims. `edgesInto` asks a producer that offers `into` and does not walk for it, so an `into` that answers only part of its producer's edges makes the rest unreachable rather than slow. Today only the `contains` producer offers one, and it is complete by construction.
