import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0b6d88701fa83c54 = {
  id: "019f58af-5c89-74ff-af97-c5a643206d51",
  type: "page-type/image",
  slug: "image-0b6d88701fa83c54",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude writer woman behind a vintage typewriter, cigarette holder, noir office light, story in her eyes, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1456401562,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
