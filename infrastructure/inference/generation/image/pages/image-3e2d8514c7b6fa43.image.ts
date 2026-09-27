import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e2d8514c7b6fa43 = {
  id: "019f1839-421f-7c9b-9285-ea39d16954aa",
  type: "page-type/image",
  slug: "image-3e2d8514c7b6fa43",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic, a young woman standing on the right third of a wide horizontal frame with calm open negative space on the left half, waist-up close framing so she fills the right of the frame, looking directly at the viewer with a warm soft alive expression, long wavy auburn-brown hair loose over bare shoulders, wearing a cream off-shoulder silk-and-lace princess chemise with pink ribbon lacing at the bodice and a brown leather work-belt at her hip holding a glowing warm-amber crystal tool, sunlit brass-and-vine solarpunk workshop-garden, a vine-wrapped brass column and a hanging brass lantern on the left side, warm golden-green dappled light, soft bokeh greenery, cinematic warm light, realistic skin, DSLR 85mm, sharp focus",
  seed: 5002,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/outdoor", "setting-tag/garden", "setting-tag/cabin"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/corset",
    "wardrobe-tag/off-shoulder",
    "wardrobe-tag/lace",
    "wardrobe-tag/silk",
    "wardrobe-tag/belt",
  ],
  fantasyTags: ["fantasy-tag/steampunk", "fantasy-tag/historical"],
} as const satisfies Image
