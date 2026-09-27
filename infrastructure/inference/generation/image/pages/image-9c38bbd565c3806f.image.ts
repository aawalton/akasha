import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c38bbd565c3806f = {
  id: "01a0c5f3-7a9c-7d9c-8991-bab8838dcd95",
  type: "page-type/image",
  slug: "image-9c38bbd565c3806f",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "reclining topless woman with one forearm laid across her chest, other hand behind her head, film-noir side light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 340983585,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/dimly-lit"],
  poseTags: [
    "pose-tag/close-up",
    "pose-tag/reclining",
    "pose-tag/arms-raised",
    "pose-tag/looking-down",
  ],
} as const satisfies Image
