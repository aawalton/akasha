import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4e53e8e0ac65aeb5 = {
  id: "01a0c5f3-b3c9-7a8f-90b6-bf6c87629d3c",
  type: "page-type/image",
  slug: "image-4e53e8e0ac65aeb5",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a silk headscarf and sunglasses pushed down her nose sitting on a parked cream Vespa in a cobbled Roman lane, dolce vita mood, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 471477798,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
