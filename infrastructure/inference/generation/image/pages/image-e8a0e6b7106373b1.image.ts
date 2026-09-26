import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8a0e6b7106373b1 = {
  id: "019f22d4-8007-7597-90da-42965d051afb",
  type: "page-type/image",
  slug: "image-e8a0e6b7106373b1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 cinematic night scene. On the FAR LEFT of the frame: a tall carved wooden watch-post with a great curved horn hanging from it, lit by a small brazier flame — standing at the near end of a fire-edged wooden bridge that recedes across dark water toward a faint distant glow. The ENTIRE LEFT AND CENTER of the frame is this calm bridge scene under green aurora curtains in a deep night sky. On the FAR RIGHT EDGE: a beautiful Norse watcher woman, framed chest-up and LARGE, body angled slightly left exactly like a sentinel at her post, face turned to make direct eye contact with the viewer, calm and faintly amused. Long white-gold hair half-gathered back, pale luminous skin, prismatic iridescent eyes, white and silver gown with fine gold trim. Firelight from below rim-lighting her, aurora light from above. Sharp photographic detail, cinematic.",
  seed: 403,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
