import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6cfad4323033629d = {
  id: "01a0c5f3-3621-7649-8b69-d06351e84fa9",
  type: "page-type/image",
  slug: "image-6cfad4323033629d",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a petite slim young woman leaning back against a dorm wall with hands in her hoodie pocket, slight youthful feminine build, flat chest, short choppy sky-blue bob, sky-blue eyes, fair skin, sarcastic half-smile, direct eye contact, oversized cream hoodie and short shorts, bare legs, soft window light and neon sign behind, 35mm full length, photorealistic",
  seed: 616,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
