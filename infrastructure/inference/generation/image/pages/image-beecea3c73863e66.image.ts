import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBeecea3c73863e66 = {
  id: "01a0c5f4-03a3-7f55-865a-b7304bb187a0",
  type: "page-type/image",
  slug: "image-beecea3c73863e66",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo, two young Korean women mid-twenties slim kpop-idol builds in the rain, the taller woman standing directly behind the shorter one, both bodies facing the camera, the rear womans face appears above and just behind the front womans head, her arms draped over the front womans shoulders from behind, both delighted laughing smiles, drenched, wet lingerie, lush green background, soft light, authentic candid snapshot, front-on view",
  seed: 1215840386,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
