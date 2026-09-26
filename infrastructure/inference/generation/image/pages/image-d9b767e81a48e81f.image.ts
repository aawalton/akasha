import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD9b767e81a48e81f = {
  id: "019f1838-5bfd-71b3-ba76-d855bbf59170",
  type: "page-type/image",
  slug: "image-d9b767e81a48e81f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic photograph, strong right-weighted composition. A radiant woman with long auburn copper hair stands three-quarters to the right of the frame in a vast field of ripe golden summer wheat at golden hour, turned slightly toward the viewer with a warm curious half-smile. The low warm sun is off-frame to the right, backlighting and rim-lighting her hair and shoulders from the right, warm light raking left across the field. Creamy white meadowsweet flowers in the foreground near her. A low green hill sits on the far left horizon. The wide open golden field sweeps across the entire left of the frame as calm negative space. Painterly photographic, warm gold cream and meadow-green palette, soft sunflare from the right edge",
  seed: 1945769299,
  width: 2016,
  height: 864,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
