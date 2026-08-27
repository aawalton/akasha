---
page-type-slug: page-type
title: "Music song"
id: 019dbaf4-cdd3-7f5a-a5b0-0bfdc8da0f6e
extends-slug: page
files: akasha:**/*.music-song.md
body-shape-slug: empty
slug: music-song
domain-parent-slug: domain/music
required-reading-slugs:
  - repo/memory-repo
named-for: "{slug}"
---

# Definition

- **Music song** — a piece of music in Alan's catalogue.

# Design

A song names one artist.

A song's lyrics are fetched from a lyrics provider, and its rating is Alan's own.

A song is named for its artist's slug and its title slugified: every diacritic folded to its base letter, the rest lowercased, every other run collapsed to one dash.

The slug a page href uses does not fold, so it is not this.

A title leaving nothing is named `untitled`; a name already standing takes the next free number from two.

A song already held keeps its name.
