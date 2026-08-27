---
id: 1618ef61-9888-5c03-af44-8f29e5093acd
page-type-slug: ops-command
title: "Ops inference generate"
slug: ops-inference-generate
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/generate.ts
path: inference generate
---

# Definition

- **Ops inference generate** — an image made from a text prompt by the image model loaded on the host.

# Help

Generate an image from a text prompt via the image-gen pool service (Z-Image-Turbo, MLX) on the macbook MLX fleet (which must be reachable on the tailnet). Routes through the traffic cop (cold-loading the model on first use), decodes the PNG, writes it, and records an `inference-run` row capturing the full recipe.
