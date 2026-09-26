import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE5567bed1c1d4e60 = {
  id: "01a0c5f3-3621-7170-8bd4-00333b97a49f",
  type: "page-type/image",
  slug: "image-e5567bed1c1d4e60",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic studio photo of a slender petite young woman leaning against a soft seamless wall, slim youthful feminine figure, small frame, flat chest, short feathered sky-blue pixie cut, large bright sky-blue eyes, fair skin with light freckles, playful smirk, looking at the camera, oversized pastel-blue hoodie and short shorts, bare legs, clean soft studio lighting, 35mm full length, photorealistic",
  seed: 615,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
