---
id: bc8e92f1-72e6-5c25-af45-3e1b9e20e1f5
page-type-slug: old-ops-command
title: "Ops wan extend"
slug: ops-wan-extend
domain-parent-slug: domain/ops-wan
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/wan/extend.ts
path: wan extend
---

# Definition

- **Ops wan extend** — new frames generated before or after an existing clip, conditioned on a window of its own frames.

# Help

Extend an existing Wan 2.2 mp4 by conditioning a fresh I2V run on a multi-frame context window pulled out of the clip, so only the adjacent new frames are denoised. --direction forward pulls the LAST --context-frames frames and generates --new-frames after them (continue the clip); --direction back pulls the FIRST --context-frames frames and generates --new-frames before them (extend backward). The context window is loaded as an IMAGE batch via VHS_LoadVideoPath and wired into WanFirstLastFrameToVideo, which masks the supplied frames as fixed and generates the rest. The final length (context + new) is snapped up to Wan's required 4k+1. Output dimensions default to the context clip's own width×height (probed with ffprobe). Requires the container up (`infra/wan/bin/wan-up.sh`) and weights provisioned (`wan-provision.sh` beside it). VRAM discipline: one GPU workload at a time, never alongside training.
