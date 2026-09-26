import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image83d6eab3223c0500 = {
  id: "019f23fc-15c0-7f75-b3fc-5ecdf47fd650",
  type: "page-type/image",
  slug: "image-83d6eab3223c0500",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide night interior of an old blacksmith forge, photoreal. The heart of the frame is a forge fire burning pure GOLD at center-right, sparks rising; a young woman blacksmith stands at the right third, back half-turned toward the viewer, lit warm by the golden flame. The left half of the frame opens onto her long workbench under small pools of warm lamplight: finished work laid out in rows — small blades, hinges, delicate metal birds, a kettle — each catching a glint of gold. Dark timber walls and deep shadow between the light pools. Warm, intimate, photographic realism, not painterly.",
  seed: 8177,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
