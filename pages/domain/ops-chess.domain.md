---
id: 96a0b740-47c7-5597-90c6-3df960384f96
page-type-slug: domain
title: "Ops chess"
slug: ops-chess
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/chess
---

# Definition

- **Ops chess** — the commands that put a position to a self-hosted engine and report what it answers.

# Design

Every command but `play-game` answers about one position handed to it as a FEN and keeps no board of its own, so the caller carries the game from run to run.

Stockfish settles legality, score and terminal status for all of them, and nothing here holds a second move generator that could disagree with it.

Every engine is a local binary reading a local weights file, so no command here reaches a network.
