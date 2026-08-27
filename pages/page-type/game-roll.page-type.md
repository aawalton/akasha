---
id: 019f2a41-e325-704d-b02c-0e31e89531cf
page-type-slug: page-type
title: "Game roll"
extends-slug: page
files: none
body-shape-slug: empty
slug: game-roll
plural-slug: game-rolls
domain-parent-slug: page-type/game
---

# Definition

- **Game roll** — one settled chance, with the seed it was drawn from.

# Design

A roll carries the hash of the roll before it, so the whole run is checkable from either end.

The seed is chosen before the roll is asked for, never after.
