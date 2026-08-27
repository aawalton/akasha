---
id: b11a589d-4d42-5adb-a39c-6cf711356b71
page-type-slug: old-ops-command
title: "Ops music listening"
slug: ops-music-listening
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/music/listening.ts
path: music listening
---

# Definition

- **Ops music listening** — printing a Spotify snapshot: currently-playing, recently-played, and the top artists and tracks.

# Help

Print Alan's personal Spotify listening — currently-playing, recently-played, and top artists/tracks for an affinity window — by reading the live Spotify Web API through the standalone @collections/music-spotify client. READ-ONLY: no playback control, no writes. Requires the standalone client's PKCE token obtained by that client's own login ceremony.
