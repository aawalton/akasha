import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2bf7d058674b4524 = {
  id: "01a0c5f3-7a99-7858-b49d-288473d556c5",
  type: "page-type/image",
  slug: "image-2bf7d058674b4524",
  persona: "persona/nimue",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide desktop wallpaper, 12:5 aspect. A woman standing in the RIGHT third, chest-up, composed and observed, three-quarter turn with direct eye contact and a subtle confident expression. Tailored slate coat. On the LEFT half, a glass-and-steel architectural recession, a softly lit doorway and receding rooftop structure in soft focus, forms calm negative space for desktop icons. Cool evening palette, slate and ice-blue, faint city haze, one soft warm rim on her hair. Sun out of frame, shallow depth of field, cinematic photographic light, natural skin texture.",
  seed: 19820016,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
