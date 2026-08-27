---
id: 94a2335d-bc86-5b1f-b546-2dd0a539201a
page-type-slug: finding
title: "Cut block needs intent"
domain-slug: domain/design-system
---

# Claim

The design-system's block editor has no cut-block affordance, and whether to add one -- and whether it should be Mod+X or a house chord -- depends on intent Alan has not yet given.

# Evidence

Surfaced as a grammar gap during #15856 (the block editor has no cut-block); parked in prose, filed now so it can reach a steering surface instead of dying in notes. Described as a net-new feature, wanting Alan's intent before build: does he want cut-block at all, and should it be Mod+X (the L1 clipboard convention, scoped to a selected block) or a house chord? Per Lowest-Layer Sufficiency, Mod+X is the L1 clipboard convention and a block-scoped cut is arguably the same action on a different selection, so focus-scoping may resolve it without a new chord. Stated explicitly: not dispatchable until that intent lands. Project #16108, status someday_maybe, live-on: deploy, domain design-system.
