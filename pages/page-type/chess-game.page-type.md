---
id: 019f06da-9e06-753e-8a9a-befe4c305123
page-type-slug: page-type
title: "Chess game"
extends-slug: page
files: akasha:**/*.chess-game.md
body-shape-slug: empty
slug: chess-game
plural-slug: chess-games
domain-parent-slug: domain/chess
---

# Definition

- **Chess game** — one complete game, with the moves that were played.

# Design

A game comes either from the master games committed beside the ingester or from a game Alan played against Maia.

A game is keyed on its external id, so the same game read twice is one game.

A game's moves stand beside it as a PGN file rather than in its frontmatter.
