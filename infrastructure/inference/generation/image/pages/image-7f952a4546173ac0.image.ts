import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f952a4546173ac0 = {
  id: "01a0c5f3-8d0d-7e09-b8b8-bd24f81866bf",
  type: "page-type/image",
  slug: "image-7f952a4546173ac0",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close-up portrait, head and shoulders: a luminously beautiful young Norse woman, rainbow light refracting softly across her face and pale skin as if standing inside a prism — bands of spectral color playing over her cheekbone and hair. Long silver-blonde hair, clear bright eyes with a faint iridescent shimmer, a small knowing half-smile of someone who sees everything and tells nothing. Warm, radiant, quietly amused. Dark simple background so the prismatic light on her skin carries the frame. Sharp photographic detail, cinematic lighting.",
  seed: 303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
