import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image417dee0c632a6da5 = {
  id: "01a0c5f3-6910-7ad6-97f5-e85f286c00b5",
  type: "page-type/image",
  slug: "image-417dee0c632a6da5",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking woman turning a great glowing orrery of rings and gears and planets of light, the machinery of the rules of worlds, with warm steady hands; brass and starlight, cold mechanism made intimate by her touch; amber and deep teal palette, cinematic volumetric light, painterly photoreal, feminine and warm, alive not robotic",
  seed: 832271725,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
