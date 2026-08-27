---
id: bb1ccff5-b68c-5479-8532-59a2e0537423
page-type-slug: old-ops-command
title: "Ops inference segment"
slug: ops-inference-segment
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/inference/segment.ts
path: inference segment
---

# Definition

- **Ops inference segment** — an image's foreground separated from its background as an 8-bit alpha matte.

# Help

Matte an image's foreground from its background with BiRefNet (the rembg package) via the segment-rembg pool service on the macbook. The separation is SEMANTIC, not a luminance crush — near-black subject regions (dark clothing) are included by meaning and fine/translucent edges (hair, flame) keep continuous alpha. Always writes an 8-bit single-channel alpha matte; pass --cutout for an RGBA cutout and --flatten <color> to composite the foreground onto a solid background. Routes through the traffic cop (cold-loading the model on first use) and records an `inference-run` row. The macbook must be reachable on the tailnet.
