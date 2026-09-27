import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4788fdece8be6730 = {
  id: "01a0c5f3-8d0c-7c5c-95f6-686c6bdc3cff",
  type: "page-type/image",
  slug: "image-4788fdece8be6730",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Intimate first-person POV of a beautiful young woman in a warm private bedroom at golden hour, soft and inviting. She wears a delicate semi-sheer cream wrap loosely tied — suggesting rather than revealing, an intimate veiled softness, bare shoulder and collarbone visible. Tender warm direct gaze meeting your eyes, a gentle knowing half-smile, relaxed and at ease with you. Soft auburn waves, fair skin with natural realistic texture and a few freckles, warm lamplight and golden window glow, shallow depth of field, photographic, naturalistic, deeply personal and safe. Only her in frame, nothing of the viewer visible.",
  seed: 632952346,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-4",
  settingTags: ["setting-tag/bedroom", "setting-tag/indoor"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/sleeveless",
    "wardrobe-tag/deep-v-neck",
    "wardrobe-tag/sleepwear",
  ],
} as const satisfies Image
