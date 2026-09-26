import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image645341d164dddf1e = {
  id: "01a0c5f3-3621-7f37-9934-71778623a9cd",
  type: "page-type/image",
  slug: "image-645341d164dddf1e",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slender petite young woman leaning one shoulder against a plain hallway wall, ankles crossed, slim youthful feminine figure, flat chest, short cropped sky-blue hair, sky-blue eyes, fair skin, amused smirk, looking at the camera, oversized black graphic hoodie and short shorts, bare legs, soft daylight, 35mm full length, photorealistic",
  seed: 613,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
