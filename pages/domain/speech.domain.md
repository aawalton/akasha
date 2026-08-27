---
id: 9f4d00f2-ed49-539f-ab40-fdfefd639702
page-type-slug: domain
title: "Speech"
slug: speech
domain-parent-slug: domain/alan-harness-desktop
required-reading-slugs:
  - domain/alan-harness-mobile
---

# Definition

- **Speech** — Alan and the system talking to each other out loud.

# Design

Audio is synthesised a segment at a time and streamed, never rendered whole.

Streamed audio cannot be scrubbed or resumed, and a stored rendition can.
