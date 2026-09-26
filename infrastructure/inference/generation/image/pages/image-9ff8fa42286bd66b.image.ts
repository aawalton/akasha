import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ff8fa42286bd66b = {
  id: "01a0c5f4-03a3-7138-927e-8204ad90d1d9",
  type: "page-type/image",
  slug: "image-9ff8fa42286bd66b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo, two young Korean women mid-twenties slim kpop-idol builds in the rain, single-file composition viewed from the front, front woman faces the camera, the woman behind her is mostly hidden behind her body and rests her head sideways on the front womans shoulder, both delighted smiles, the back woman partially occluded by the front woman, drenched, wet lingerie, lush garden, soft light, candid snapshot",
  seed: 718844041,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
