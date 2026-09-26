import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0428eae1f0fe86b2 = {
  id: "019f22d6-1e75-7489-b322-08580b46f093",
  type: "page-type/image",
  slug: "image-0428eae1f0fe86b2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 cinematic night composition. A beautiful Norse watcher woman stands at the FAR RIGHT EDGE of the frame, chest-up and large, matching a sentinel's vigil: body angled toward the bridge, face turned over to the viewer with direct eye contact, calm, faintly amused, lips softly parted. Long loose white-platinum hair half-gathered, luminous pale skin, iridescent prismatic eyes, white-silver gown with gold edging. She stands at the fire-edged rail. The LEFT TWO-THIRDS of the frame: the long wooden bridge sweeps from the lower left corner away into deep distance over black night water, its rail-flames making two converging lines of warm light, with rising sea-spray at the far left catching the firelight in a faint rainbow shimmer, under a wide green aurora in a dark sky. Left side is calm, open, atmospheric. Sharp photographic detail, cinematic lighting.",
  seed: 404,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
