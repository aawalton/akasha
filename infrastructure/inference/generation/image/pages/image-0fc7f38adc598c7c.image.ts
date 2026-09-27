import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0fc7f38adc598c7c = {
  id: "01a0c5f3-b3c8-7ba9-bffe-1ed4c56b7163",
  type: "page-type/image",
  slug: "image-0fc7f38adc598c7c",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Indiana personified as a beautiful young woman in her early twenties — chestnut hair loose, checkered-flag-pattern scarf over a simple white dress, pink peonies in hand, golden cornfields and a red barn behind her, warm heartland sunset light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 92766233,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/outdoor", "setting-tag/field"],
  poseTags: ["pose-tag/standing", "pose-tag/holding-flowers", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/sundress", "wardrobe-tag/scarf"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
