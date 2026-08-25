---
id: 99f65139-1fd8-4181-9e5b-8c38885d511b
page-type-slug: image-generation-model
title: "Z-Image-Turbo"
slug: z-image-turbo
domain-parent-slug: image-generation-models
unet-file: z-img-turbo_fp8-e4m3fn.safetensors
clip-file: qwen_3_4b_fp8_mixed.safetensors
clip-type: lumina2
vae-file: ae.safetensors
model-shift: 3.0
default-steps: 8
default-guidance: 1.0
sampler-name: euler
scheduler: simple
---

# Definition

- **Z-Image-Turbo** — Tongyi's distilled text-to-image model.

# Design

Trained at 1024 pixels square.

A wide frame duplicates a dominant figure in it once it is large, at 3440 pixels across and not at 2048.

A landscape in the same frame is unaffected.

Naming what fills the width prevents the duplication.

Sharpness falls with the longest edge past 2224 pixels, whatever the frame's area or shape.
