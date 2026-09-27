import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67db345266d2a1b0 = {
  id: "01a0c5f3-9f6b-7e1c-a91e-cba6ab9f3e5c",
  type: "page-type/image",
  slug: "image-67db345266d2a1b0",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman, ivory porcelain-smooth skin, pale blue glass eyes, powdered ash-blonde hair dressed high with a few curls loose, delicate fine features, slender willowy build, small breasts, narrow shoulders and narrow waist, fine-boned and delicate, graceful rather than voluptuous, hinged panels open in her chest and along one thigh showing fine brass clockwork turning inside her, wearing an unlaced cream silk corset slipping down off her small breasts and pale stockings, seated sideways on a gilt chair with one arm over its back and her body twisted toward the camera, a sly curious just-woken expression, candlelit baroque salon, gold and ivory, painterly character portrait, direct eye contact with the viewer, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 475337076,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/indoor", "setting-tag/luxury"],
  poseTags: ["pose-tag/sitting", "pose-tag/reclining", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/topless",
    "wardrobe-tag/corset",
    "wardrobe-tag/garter-belt",
    "wardrobe-tag/stockings",
  ],
  fantasyTags: ["fantasy-tag/steampunk"],
} as const satisfies Image
