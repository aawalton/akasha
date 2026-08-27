---
id: eccdddee-f608-5a1a-8279-ac02d0e6c809
page-type-slug: domain
title: "Ops chess-game"
slug: ops-chess-game
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/chess
---

# Definition

- **Ops chess-game** — the commands that put the vendored master games into the store and read one back out.

# Design

No command here records a game somebody played; each game it writes comes out of the committed master games.

`ingest` ensures the page type before it writes, so nothing has to be seeded ahead of it.
