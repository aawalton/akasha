import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEaa9ad0125a40353 = {
  id: "019f2346-68a1-7650-bd05-76179d7e13bf",
  type: "page-type/image",
  slug: "image-eaa9ad0125a40353",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 photoreal workshop scene, warm lamplight. A woman leatherworker stands at her workbench on the RIGHT THIRD of the frame, waist-up, large in frame, facing the viewer with direct eye contact, calm faint smile. Dark hair bound back loosely, simple linen work shirt, sleeves rolled, a leather bracelet with small gold buckles on her wrist. She leans one hand on the bench, at ease, a fine awl set down beside her hand. The LEFT HALF of the frame is calm negative space: a deep workshop wall receding into shadow with a single tall window, soft blue evening light coming through, hanging bridles and reins as dark silhouettes near the window. Warm amber lamplight on her, cool dusk on the left. Photoreal, cinematic, intimate workshop atmosphere.",
  seed: 5201,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
