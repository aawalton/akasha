import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE301ccb537ed2033 = {
  id: "019f2d5c-8821-7785-bf0f-4e776f151b1e",
  type: "page-type/image",
  slug: "image-e301ccb537ed2033",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties leaning her shoulder against the cool glass wall of a night studio, moonlit canyon and mist vast behind her, arms loosely crossed, head tilted toward the glass as if hearing the gorge through it, grey-green eyes direct on the viewer, small smile, tangled dark hair, warm weathered skin, wearing only a sheer gauzy ivory robe with a clean straight deep V to the navel, nothing under the sheer, brass headphones at her collarbones",
  seed: 566737269,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
