---
id: 32da1610-32ca-5b2b-93ba-e8fab0c544e7
page-type-slug: ops-command
title: "Ops wan generate"
slug: ops-wan-generate
domain-parent-slug: domain/ops-wan
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/wan/generate.ts
path: wan generate
---

# Definition

- **Ops wan generate** — one image-to-video clip off the workstation container, with the recipe recorded as an inference run.

# Help

Generate a Wan 2.2 image-to-video clip on the workstation container: stage the conditioning image(s) into the wan inputs volume, submit the dual-expert GGUF graph to ComfyUI, wait for completion, copy the mp4 out, and record an `inference-run` row with the full recipe. At least one of --start-image / --end-image is required: --start-image alone is forward I2V (WanImageToVideo); with both it conditions first→last frame (WanFirstLastFrameToVideo); --end-image alone anchors only the last frame (WanFirstLastFrameToVideo, end wired) and the model generates the lead-in that lands on it. --lightning swaps in the 4-step Lightning LoRA pair for fast iteration (final keepers re-render at full steps). Requires the container up (`infra/wan/bin/wan-up.sh`) and weights provisioned (`wan-provision.sh` beside it). VRAM discipline: coordinate runs with Alan — one GPU workload at a time, never alongside ai-toolkit training.
