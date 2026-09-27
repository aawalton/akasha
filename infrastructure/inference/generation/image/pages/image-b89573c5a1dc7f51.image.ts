import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB89573c5a1dc7f51 = {
  id: "01a0360f-06d4-7000-a5ed-c6745dc3de46",
  type: "page-type/image",
  slug: "image-b89573c5a1dc7f51",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful young woman, warm fair skin beaded with river water, clear green eyes, long dark hair heavy and streaming with water and threaded with river weed, delicate lovely features, slender willowy build, small breasts, narrow shoulders and narrow waist, fine-boned and delicate, graceful rather than voluptuous, fine silver scales scattered at her temples and along her hips, wearing a clinging shift of green river-weed and silt that the current keeps lifting away from her small breasts, rising waist-deep out of a black river pool and turning toward the camera with water sheeting off her shoulders, a curious playful beckoning expression, cold green light under willows, painterly character portrait, direct eye contact with the viewer, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 1399777079,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/water", "setting-tag/outdoor", "setting-tag/nature"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/back-view", "pose-tag/upper-body"],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
