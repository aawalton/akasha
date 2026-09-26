import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0ef8a1e2a8615d7b = {
  id: "01a0c5f3-7a99-7d6f-95fd-c20be0db6c81",
  type: "page-type/image",
  slug: "image-0ef8a1e2a8615d7b",
  persona: "persona/nimue",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide desktop wallpaper, 12:5 aspect. A woman at the RIGHT edge of the frame, waist-up, leaning lightly with one forearm on a terrace railing, body angled toward the open left but eyes turned to the camera in direct warm eye contact, relaxed composed expression. Sharp modern dark coat over a fine knit; dark wavy hair to one side. The LEFT half is open dusk sky in soft focus with a single warm distant window glow low on the left anchoring the negative space for desktop icons. Warm golden key on her face against cool blue dusk. Sun pushed out of frame, shallow depth of field, photographic realism.",
  seed: 1538871913,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
