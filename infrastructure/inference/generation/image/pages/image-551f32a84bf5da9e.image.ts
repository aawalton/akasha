import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image551f32a84bf5da9e = {
  id: "019f2347-fda9-75c8-a12a-5d97eabbb71f",
  type: "page-type/image",
  slug: "image-551f32a84bf5da9e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 photoreal workshop scene, warm lamplight. A woman leatherworker stands at her workbench on the RIGHT THIRD of the frame, waist-up, large in frame, facing the viewer with direct eye contact, calm faint smile. Dark hair bound back loosely, simple linen work shirt, sleeves rolled, a leather bracelet with small gold buckles on her wrist. She rests one hand on the bench beside a half-finished bridle she has just set down. The LEFT HALF of the frame is calm negative space: a long workbench surface receding left into warm shadow, a single oil lamp burning low at the far left edge, wood shavings and a coiled rein on the bench, tool wall faint in darkness behind. Single warm light source, deep shadows, golden hour workshop intimacy. Photoreal, cinematic.",
  seed: 5202,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
