---
page-type-slug: finding
title: "A model's properties stand in its page and again in code, and only the code is read"
domain-slug: domain/image-generation-models
slug: model-properties-unread
---

# Claim

The `image-generation-model` page type states that what a model is loaded and sampled with stands in its properties, and nothing in code. For `z-image-turbo` both are true at once: the page carries those properties, and `packages/infra/zimage/src/cli/models.ts` carries the same facts as literals.

Nothing reads the page. The properties are therefore not the source of what the model is loaded with — they are a second copy, and the copy the running code does not consult. A change made to the page would take effect nowhere, and would read to whoever made it as though it had.

The code table is also wider than the pages. Eight or more model entries stand in `models.ts` against the one page under `akasha/models/`, so the two are not a duplicate pair that could be resolved by deleting either side.

# Evidence

The page, `akasha/models/image-generation/z-image-turbo.image-generation-model.md`, states in its frontmatter: `unet-file: z-img-turbo_fp8-e4m3fn.safetensors`, `clip-file: qwen_3_4b_fp8_mixed.safetensors`, `clip-type: lumina2`, `vae-file: ae.safetensors`, `model-shift: 3.0`, `default-steps: 8`, `default-guidance: 1.0`, `sampler-name: euler`, `scheduler: simple`.

The line it stands under is `instructions/pages/page-type/image-generation-model.page-type.md:18` — "What a model is loaded and sampled with stands in its properties, and nothing in code."

The same facts stand in `instructions/packages/infra/zimage/src/cli/models.ts`:

- line 32 — `export const ZIMAGE_TURBO_UNET = "z-img-turbo_fp8-e4m3fn.safetensors"`
- line 43 — `const DISTILLED: SamplerProfile = { defaultSteps: 8, defaultGuidance: 1.0 }`
- line 51 — `clipType: "lumina2",`
- line 64 — `"z-image-turbo": zImage("z-image-turbo", ZIMAGE_TURBO_UNET, DISTILLED),`

Those match the page's `unet-file`, `default-steps`, `default-guidance` and `clip-type` exactly.

That nothing reads the page: `ops file-structure uses models` reports the page as `unused  0`. A search of every repository for `z-image-turbo` outside `node_modules` returns the page itself and the instructions code paths — `tools/commands/zimage/generate.ts:35,126`, `tools/lib/inference/registry.ts:35,39`, and `packages/infra/zimage/src/cli/models.ts` — none of which reaches the page. `generate.ts:35` carries `default: "z-image-turbo"` as a literal, and `models.ts:64` resolves that name through the code table.

The breadth of the code table: `models.ts` names `z-image-base`, `z-image-turbo`, `z-image-de-turbo`, `beyond-reality-3`, `juggernaut-z-v1`, `redzdpo-v5-veris` and `twinflow-z-image-turbo`, against the single page under `akasha/models/`.

This is a reading of the files as they stand. No image generation was run.
