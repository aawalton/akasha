---
id: 3c4c52c4-9c9e-5b3f-9e79-430c5428113a
page-type-slug: ops-command
title: "Ops music now-playing"
slug: ops-music-now-playing
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/music/now-playing.ts
path: music now-playing
---

# Definition

- **Ops music now-playing** — printing the current Spotify track and playback state, reporting no active device as a state.

# Help

Print the currently-playing Spotify track and playback state by reading the live player surface. READ-ONLY. Reports no-active-device cleanly (exit 0) so the Eppie loop can probe reachability. Requires the standalone @collections/music-spotify PKCE token.
