import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42e9752e375a895a = {
  id: "01a0c5f3-9f6c-7a50-9084-32c27e150b5e",
  type: "page-type/image",
  slug: "image-42e9752e375a895a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a red silk qipao unfastened and slipping off one shoulder, held loosely at her chest, lantern-lit night, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1189201131,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/studio", "setting-tag/dark-background", "setting-tag/indoor"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/hands-on-chest", "pose-tag/upper-body"],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/silk",
    "wardrobe-tag/strapless",
    "wardrobe-tag/bare-shoulders",
  ],
} as const satisfies Image
