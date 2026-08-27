---
id: db8555f7-bd2d-5859-83e7-0e2b21015023
page-type-slug: ops-command
title: "Ops inference music"
slug: ops-inference-music
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/music.ts
path: inference music
---

# Definition

- **Ops inference music** — a song made from a style prompt and optional lyrics, sung or instrumental.

# Help

Generate a song from a style prompt (and optional lyrics) via the music-gen pool service (ACE-Step 1.5, MLX-native on the macbook). Routes through the traffic cop (cold-loading the model on first use), submits an async generation task, polls until it finishes, downloads the WAV, and records an `inference-run` row capturing the full recipe (prompt, lyrics, seed, steps, duration, models). Workstation-only — the macbook must be reachable on the tailnet.
