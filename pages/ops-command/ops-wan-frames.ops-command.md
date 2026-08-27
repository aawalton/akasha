---
id: 9a885223-3456-5fa7-b4b1-81acce776fc1
page-type-slug: ops-command
title: "Ops wan frames"
slug: ops-wan-frames
domain-parent-slug: domain/ops-wan
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/wan/frames.ts
path: wan frames
---

# Definition

- **Ops wan frames** — an mp4's frames written out as numbered PNGs, either every frame or sampled at a rate.

# Help

Extract PNG frames from a generated mp4 via host ffmpeg (no GPU, no container). Omit --fps to extract every frame; pass --fps N to sample at N frames per second. Frames land as frame-0001.png… in --out-dir, ready for `ops wan score`.
