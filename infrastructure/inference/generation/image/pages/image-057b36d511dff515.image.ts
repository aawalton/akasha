import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image057b36d511dff515 = {
  id: "019f57c4-7546-79ef-875c-ef66df6611f0",
  type: "page-type/image",
  slug: "image-057b36d511dff515",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid documentary photograph of Alaska personified as a beautiful young woman in her early twenties — windswept light-brown hair escaping a fur-trimmed parka hood, realistic freckled skin chapped pink by cold, honest natural face, standing on snowy tundra at blue-hour dusk with green aurora borealis over snow-capped mountains behind her, ambient natural light only, no flash, shot on Fujifilm, film grain, natural skin texture, photojournalism style, three-quarter view portrait",
  seed: 680260814,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
