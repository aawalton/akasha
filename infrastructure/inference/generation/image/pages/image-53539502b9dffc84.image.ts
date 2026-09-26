import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image53539502b9dffc84 = {
  id: "01a0c5f3-7a99-7db8-8419-4a9d28722a10",
  type: "page-type/image",
  slug: "image-53539502b9dffc84",
  title: "Shaestrel crowned with ivy",
  persona: "persona/shaestrel",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — fair skin with a faint cool-green cast, fine leaf-shaped brows, wild green-tinged hair threaded with small leaves, vivid green eyes with a playful knowing spark, a fitted gown of dark-green overlapping leaves, dappled dusk-forest light, a sharp clever half-smile — beautiful and a touch mischievous, delicately pointed fae ears, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
