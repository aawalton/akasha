import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8b01e7b92bab3c8 = {
  id: "019f1838-5ba0-776a-b12f-1b4ba17d9562",
  type: "page-type/image",
  slug: "image-a8b01e7b92bab3c8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic photograph, a radiant woman with long auburn copper hair standing on the right third of the frame in a vast field of ripe golden summer wheat at golden hour, turned slightly toward the viewer with a warm curious half-smile, low warm sun backlighting her hair like fire, creamy white meadowsweet flowers in the foreground, a low green hill far in the soft-focus distance, the wide open golden field stretching across the rest of the frame to the left, summer evening light, painterly photographic, warm gold cream and meadow-green palette, soft sunflare, wide panoramic composition with open negative space on the left",
  seed: 182993836,
  width: 2016,
  height: 864,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
