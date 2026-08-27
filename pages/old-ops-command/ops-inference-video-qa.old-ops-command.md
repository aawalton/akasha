---
id: eb7cb238-ef60-5edc-907f-e664a9ac0395
page-type-slug: old-ops-command
title: "Ops inference video-qa"
slug: ops-inference-video-qa
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/inference/video-qa.ts
path: inference video-qa
---

# Definition

- **Ops inference video-qa** — a checklist answered about a clip, from frames sampled evenly out of it.

# Help

Read a short generated clip with the self-hosted Qwen3-VL VLM (mlx-vlm pool service on the macbook) and answer a motion-artifact checklist — the motion class a still frame can't show. Extracts evenly-spaced frames host-side (ffmpeg), posts them with the checklist through the traffic cop, prints the model's text read, and records an `inference-run` row. Workstation-only — the macbook must be reachable on the tailnet.
