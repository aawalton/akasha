import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image980b4a01b55e54e1 = {
  id: "01a0c5f2-f92d-7aa7-9465-e414b7e2941b",
  type: "page-type/image",
  slug: "image-980b4a01b55e54e1",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, standing on a sunlit forest trail among tall pines, athletic activewear, warm radiant smile, golden hour backlight, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 498477990,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
