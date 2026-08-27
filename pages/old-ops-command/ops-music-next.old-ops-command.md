---
id: 351c4116-ba47-54aa-9838-2299cb026355
page-type-slug: old-ops-command
title: "Ops music next"
slug: ops-music-next
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/music/next.ts
path: music next
---

# Definition

- **Ops music next** — printing the next exploration the catalog selector picks, with the query that plays it.

# Help

Pick the next thing for Alan to explore — the effectful shell around the pure exploration selector. Reads the whole catalogue from the `artists-all` and `music-songs-all` page queries, runs selectNextExploration, and prints the selection (kind, artist/song ids + titles, and a playQuery) the /eppie loop drives `play` and `rate` from. Expands from the edges of what Alan already loves.
