import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9af449f93ddb4c03 = {
  id: "019f1838-5cd4-7091-bf0c-dd5b9d727d13",
  type: "page-type/image",
  slug: "image-9af449f93ddb4c03",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Wide panoramic cinematic photo, bold right-anchored composition with deep open space on the left. A woman with long flowing auburn copper hair stands far to the right of the frame amid tall golden summer wheat, body angled inward toward the open field, glancing back to the viewer with a warm curious half-smile. Strong golden-hour sun just off the right edge of the frame, casting bright rim light along her hair and arm and throwing long warm light leftward across the wheat. White meadowsweet blooms clustered in the lower-right foreground. A soft green hill low on the distant left horizon. The left two-thirds of the frame is open sunlit field, restful negative space. Painterly photographic, warm gold and cream and meadow-green, gentle lens flare from the right",
  seed: 2084960881,
  width: 2016,
  height: 864,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
