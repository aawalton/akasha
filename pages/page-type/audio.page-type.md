---
id: 019f189b-018c-74b8-920b-845fe171aee7
page-type-slug: page-type
title: "Audio"
extends-slug: page
files: none
body-shape-slug: empty
slug: audio
plural-slug: audios
domain-parent-slug: domain/generation
---

# Definition

- **Audio** — one sound the system holds.

# Design

An audio's bytes stand in the object store under the audio's own id, and on disk where the audio says they were written.

An audio records where its bytes stand, never the bytes.
