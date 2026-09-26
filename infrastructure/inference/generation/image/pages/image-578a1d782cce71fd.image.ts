import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image578a1d782cce71fd = {
  id: "01a0c5f3-9f6e-752c-8dfc-2d1648079148",
  type: "page-type/image",
  slug: "image-578a1d782cce71fd",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body fantasy art of an arctic mermaid in cold clear blue water near pale ice, bare chested with no clothing on her torso, long silver-white hair drifting across her chest, pearlescent white-and-blue scaled tail, very pale skin with faint frost-blue scale patterning, ice-blue eyes, calm ethereal expression, cool soft light, 35mm full length, photorealistic, artful",
  seed: 825,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
