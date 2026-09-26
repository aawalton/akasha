import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d80056136921425 = {
  id: "019f1838-5d30-75e8-a219-07891818b4ac",
  type: "page-type/image",
  slug: "image-3d80056136921425",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic photograph, 21:9, strong right-anchored composition. Closer medium shot of a radiant woman with long auburn copper hair, framed from the waist up, positioned far to the right of the frame about three-quarters across. She stands in golden summer wheat at golden hour, turned slightly toward the viewer with a warm curious half-smile. The low warm sun is off-frame to the upper left, casting soft warm key light across her face and the front of her hair, gentle glow spilling from the upper-left corner. Creamy white meadowsweet flowers in the foreground beside her. The open golden field falls away softly to the left as restful negative space, kept minimal. Tight intimate framing focused on her, little landscape. Painterly photographic, warm gold and cream palette, soft directional light from upper left",
  seed: 2074644182,
  width: 2016,
  height: 864,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
