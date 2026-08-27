---
id: 37738d67-952b-5d4b-a0f2-99d9b147dbda
page-type-slug: old-ops-command
title: "Ops music search"
slug: ops-music-search
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/music/search.ts
path: music search
---

# Definition

- **Ops music search** — printing Spotify track candidates for a query, each with its artists, album and URI.

# Help

Search Spotify's catalog for tracks and print the top candidates — each with its resolved artists, album, and URI. A PURE READ: it never starts playback. Pair it with `music play --uri <uri>` to play an exact verified track, so deep-cut exploration never silently plays a same-title wrong-artist song. `--artist` constrains the candidates to a given artist (case-insensitive contains). Requires the @collections/music-spotify PKCE token.
