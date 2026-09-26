import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB51cd5623bfafc27 = {
  id: "01a0c5f4-03a3-7527-876b-4096d38d7609",
  type: "page-type/image",
  slug: "image-b51cd5623bfafc27",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo, two young Korean women in their mid-twenties with slim petite kpop-idol builds, standing in the rain, both facing the camera the same direction, one woman directly in front and the second woman standing close behind her, the rear woman pressed against the front womans back with her arms wrapped forward around the front womans waist and her chin resting on the front womans shoulder, only the front womans full face is visible while the woman behind peeks over her shoulder, both delighted smiles, drenched, wet lingerie, lush green garden, soft light, authentic candid snapshot",
  seed: 1913810076,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
