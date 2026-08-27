---
id: 01a0087d-50a1-76de-a16b-76aede815418
page-type-slug: page-type
title: "Idle game"
extends-slug: collection
files: akasha:**/*.idle-game.md
body-shape-slug: empty
slug: idle-game
plural-slug: idle-games
domain-parent-slug: value/fun
named-for: "{slug}"
---

# Definition

- **Idle game** — a game Alan plays where the cards are his personas.

# Design

The browser holds the whole game, and the server only keeps a saved copy of it.

The save is read once when the game opens, and never read again.
