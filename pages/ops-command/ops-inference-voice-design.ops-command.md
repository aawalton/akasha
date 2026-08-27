---
id: 6b0719cf-dd0f-5a02-97f2-e641218a0858
page-type-slug: ops-command
title: "Ops inference voice-design"
slug: ops-inference-voice-design
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/voice-design.ts
path: inference voice-design
---

# Definition

- **Ops inference voice-design** — a text spoken in a voice built from a description of it.

# Help

Design a novel voice from a natural-language description via a voice-design pool service (VoxCPM2 by default — it honors accent; Qwen3-TTS VoiceDesign with --service qwen3-tts). Routes through the traffic cop (cold-loading the multi-GB model on first use), writes the WAV (48 kHz for VoxCPM2, 24 kHz for qwen3-tts), and records an `inference-run` row capturing the full recipe (no seed — neither model has one, so reproducibility is recipe-level). Workstation-only — the macbook must be reachable on the tailnet.
