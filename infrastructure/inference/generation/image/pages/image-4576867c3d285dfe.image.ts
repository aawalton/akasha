import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4576867c3d285dfe = {
  id: "01a0c5f2-f92d-71de-80da-e1a2ab0ab0ce",
  type: "page-type/image",
  slug: "image-4576867c3d285dfe",
  persona: "persona/aelwyn",
  service: "image-edit-qwen",
  operation: "edit",
  model: "Qwen/Qwen-Image-Edit",
  prompt:
    "The woman on the right is sharp and final — do NOT alter her, her face, body, pose, green leather armor, bare shoulder, arm wrap, or hair, and do not merge her into the trees. Keep her entire region exactly as-is. Resolve ONLY the blurred LEFT side of the frame into sharp, realistic detail that naturally continues the scene: more dense evergreen pine forest climbing the steep mountain canyon slopes, the dirt hiking trail winding further down and to the left, rugged mountains in the distance, warm golden-hour sunlight flaring from the upper left through the trees. Seamless photorealistic result with consistent perspective, depth, and warm lighting. A real photograph, not an illustration; no duplicated people, no extra figures.",
  seed: 923067418,
  steps: 24,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-e3274d67e3859b6b",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
