---
id: e558ab17-ebe2-50b7-b779-2e1be547a393
page-type-slug: ops-command
title: "Ops inference edit"
slug: ops-inference-edit
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/edit.ts
path: inference edit
irreversible: true
---

# Definition

- **Ops inference edit** — one image remade from itself and a text instruction by Google's Gemini image model.

# Help

Edit an image with a text instruction. Pass ONE image — the one to change, which is what carries the identity to preserve — plus an instruction for what to change. Identity is preserved from that single image alone, and survives multiple sequential edits, so CHAIN single-image edits rather than adding reference images; extra references render worse, not better. The sole engine `nano-banana` renders the edit against Google's Gemini image API (`gemini-3-pro-image`, Nano Banana Pro) — identity-preserving, fast, and not fleet-bound — reading the key from GEMINI_API_KEY; Gemini returns JPEG, so the bytes are transcoded (via ImageMagick) to the output path's format before writing, with PNG the standard default. Records an `inference-run` row.
