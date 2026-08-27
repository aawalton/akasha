---
id: 019f0fdc-507b-7c0f-9e07-570b07c64584
page-type-slug: page-type
title: "Game state"
extends-slug: page
files: none
body-shape-slug: empty
slug: game-state
plural-slug: game-states
domain-parent-slug: page-type/game
---

# Definition

- **Game state** — what a game shows its player at the turn it has reached.

# Design

One state stands per game, rewritten each turn rather than added to.

What a state holds is what has been revealed, never everything the game knows.
