import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image94522a43331c64fc = {
  id: "01a0c5f3-3621-7697-be31-3b21256bffc3",
  type: "page-type/image",
  slug: "image-94522a43331c64fc",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slender petite young woman leaning back against a neon-lit wall, slim youthful feminine figure, small frame, flat chest, short tousled sky-blue pixie cut, bright sky-blue eyes, fair skin, sarcastic confident smirk, looking directly at the camera, oversized pastel hoodie and short shorts, bare legs, sneakers, moody teal and pink neon light, 35mm full length, photorealistic",
  seed: 611,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
