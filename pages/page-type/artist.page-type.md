---
page-type-slug: page-type
title: "Artist"
id: 019dbaf4-cc68-753e-abce-318f9717fe44
extends-slug: page
files: memory:**/*.artist.md
body-shape-slug: empty
slug: artist
plural-slug: artists
domain-parent-slug: domain/music
required-reading-slugs:
  - repo/memory-repo
named-for: "{slug}"
---

# Definition

- **Artist** — a musician whose work Alan keeps.

# Design

An artist is imported from a provider and rated by Alan afterwards.

An artist is named for their title slugified the way a song's is, and takes no number, no two here slugifying alike.
