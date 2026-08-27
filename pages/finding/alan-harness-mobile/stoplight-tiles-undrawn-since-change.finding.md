---
id: 10de3f80-c399-5730-a603-010d14360a98
page-type-slug: finding
title: "Stoplight tiles undrawn since change"
domain-slug: domain/alan-harness-mobile
---

# Claim

The three stoplight tiles on Alan's home screen have been changed in a way nothing has drawn, and the next TestFlight cut is the first time anyone sees the result.

# Evidence

#18910 removed the order literals from `ValuesStoplightsWidget`, `InboxStoplightsWidget` and `UpkeepStoplightsWidget` and relaxed each decoder from an exact-count guard to an empty-only one. Landed on main at `469c534`, branch CI and the deploy's main pipeline green.

None of that observed a tile. There is no Swift toolchain on this workstation, and both the decode harness and the render harness need the iPhoneSimulator SDK and a booted simulator, so they run on the macbook where the cut is made. The strongest reading taken here was a tree-sitter parse over the sources, calibrated against a deliberately broken file so a green came from an instrument that can go red. That settles syntax, not types, and draws nothing.

What to look at when the cut lands: each tile's circles in the order the route sent, each labelled, each carrying its reading and its arc.

One question the cut can also answer, which nothing here could. The three tiles lay their circles out in a `LazyVGrid` of three fixed columns, so six circles fill two rows. With the count guard relaxed, a seventh value would decode and be drawn — into a third row, in a tile whose height is fixed. Whether that seventh circle appears, appears clipped, or does not appear at all is the difference between the accepted cost of this change and a silent omission of the kind it was made to avoid. A render-harness case at seven circles would settle it, and the harness already gained decode cases at seven, five, zero and scrambled.

`PersonaStoplightsWidget` is not exposed: it derives its column count from the number of circles.
