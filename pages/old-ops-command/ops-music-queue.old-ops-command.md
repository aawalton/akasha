---
id: 34dc2fd3-ee1d-5b7f-913e-21b335e6cf7d
page-type-slug: old-ops-command
title: "Ops music queue"
slug: ops-music-queue
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/music/queue.ts
path: music queue
---

# Definition

- **Ops music queue** — starting the first of a resolved set and handing the rest to the server-side queue in order.

# Help

Load a multi-track set onto the active Spotify device in one call: resolve each query to its top hit (the same search→resolve→verify path as `music play`), START the first track, and hand the rest to Spotify's SERVER-SIDE queue (`POST /me/player/queue`) in order. Because the queue lives on Spotify's side, the set keeps advancing track-to-track even after the device screen sleeps — no client polling, no idle-failure after song 1. All queries resolve before any playback starts, so a single bad query fails the whole call cleanly with nothing half-played. Exits 3 with a clear message when there is no active Spotify device — open Spotify and press play on anything, then retry. Requires the standalone @collections/music-spotify PKCE token.
