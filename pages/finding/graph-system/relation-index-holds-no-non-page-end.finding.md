---
id: b5d390d4-2ead-4468-a2cb-e217f461794c
page-type-slug: finding
title: "The pages relation index holds no edge whose far end is not a page"
domain-slug: graph-system
slug: relation-index-holds-no-non-page-end
---

# Claim

The pages system's relation index and the graph's `frontmatter` producer do not hold the same edges, and neither contains the other. The index holds every page-to-page relation the producer derives and 3,364 more it does not. The producer holds 5,300 relations whose far end is a file that is no page, and the index holds none of those, being keyed by a page's stem and type. So the graph cannot read relations off the index alone without losing every relation that reaches a plain file — including the `code` relation a page uses to name its own implementation.

# Evidence

Measured on 2026-08-27 in akasha, over the whole repository rather than a sample.

One walk over all 89,648 file nodes derives 116,609 page-to-page relation edges in 2.0s. The index holds 119,973 entries, read in 0.12s. Comparing the two as sets rather than as counts: 0 edges are in the walk and not the index, and 3,364 are in the index and not the walk. Spot-checked entries of the surplus carry the `link` key on `book-chapter` pages, which the producer does not derive.

Separately, 5,300 relation edges reach a file that carries no page type, so no index entry can name them. By key, the largest are `lyrics` 1,372, `synced-lyrics` 1,340, `data` 455, `stack` 324, `command-path` 317, `context` 260, `passage-text` 255, `effects` 132, `script` 95, `description` 63 and `code` 61. All but `command-path`, `script` and `widget-path` reach an attachment beside the page that names it.

The `code` group is the mechanism this initiative closed its "a page names the file implementing it" intent with, and `ops file-structure uses` narrows on exactly that key through `edgesInto`. A straight replacement takes it away.

# Not measured

Whether the 3,364 surplus entries are all body-derived links, or whether some are frontmatter relations the producer fails to derive, which would make them a defect in the producer rather than a difference in scope.

Whether the index could name a non-page end at all without a second keying, its files being named for a page's stem and type.

# Design note

`EdgeProducer.into` must answer completely for the kinds its producer claims. `edgesInto` asks a producer that offers `into` and does not walk for it, so an `into` that answers only part of its producer's edges makes the rest unreachable rather than slow. Today only the `contains` producer offers one, and it is complete by construction.
