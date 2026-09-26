import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42418ba28c4b3367 = {
  id: "019f1839-3d61-7b1a-b58e-8e5f5a1f163b",
  type: "page-type/image",
  slug: "image-42418ba28c4b3367",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait photograph of a young woman, Caucasian, warm wavy brown hair, natural blue eyes, pretty face, a calm confident still expression looking directly into the camera, a subtle gleam in her eyes. A princess and mechanical engineer in a high-fantasy solarpunk world. She wears a classic cute pure cream Lolita-style princess dress with no blue, and over it a fitted brown leather engineer's work-harness with buckles and a loaded tool-belt. Warm golden light in a solarpunk forge-garden of brass and blossoming vines behind her. Photorealistic, hyperrealistic, realistic detailed skin, shot on DSLR 85mm, shallow depth of field, cinematic warm lighting, sharp focus.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
