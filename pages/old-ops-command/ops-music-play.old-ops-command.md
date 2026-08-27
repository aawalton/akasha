---
id: 26bb17ee-4d87-5934-b928-bcf7e51e2cac
page-type-slug: old-ops-command
title: "Ops music play"
slug: ops-music-play
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/music/play.ts
path: music play
---

# Definition

- **Ops music play** — starting one track on the active device, resolved from a query or played verbatim from a URI.

# Help

Start playback of a track on Alan's active device. Two modes: pass a query to resolve it via Spotify search and play the top hit (optionally constrained with --artist), or pass --uri to play an EXACT verified track with no re-search — the safe path after `music search` has surfaced the right candidate, so a same-title wrong-artist track never plays silently. Exits 3 with a clear message when there is no active Spotify device — open Spotify on a device and press play on anything, then retry. Requires the standalone @collections/music-spotify PKCE token.
