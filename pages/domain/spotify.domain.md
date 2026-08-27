---
id: 4f926922-42a6-587b-a01b-3fbba2f6caf6
page-type-slug: domain
title: "Spotify"
slug: spotify
domain-parent-slug: domain/collections
---

# Definition

- **Spotify** — the client onto Spotify's Web API.

# Design

Extended Quota Mode is not pursued.

The pages integration sits in `packages/collections/music` rather than here.

# Rules

## Paced Live Sweep

**Pace and scope every live Spotify exercise run: set `SPOTIFY_RATE_LIMIT_MS=1000` and pass `--only`.**

An unpaced run looks fine right up until Spotify bans the whole account for about a day.

Write the value as digits, not `1s` or `1000ms`.

Never start a sweep while another runs anywhere.
