import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb220b0141ad8453 = {
  id: "01a0c5f3-6910-7ade-9914-610aba880a35",
  type: "page-type/image",
  slug: "image-ab220b0141ad8453",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking ethereal woman seated at a vast loom strung with thousands of glowing threads of light, each thread a different world; she weaves fate with graceful hands, threads of starlight running through her fingers; serene knowing expression, warm and alive, softly luminous skin; deep indigo and gold palette, volumetric light, painterly realism, feminine and divine, not robotic",
  seed: 449942611,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
