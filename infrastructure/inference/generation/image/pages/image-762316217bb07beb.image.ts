import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image762316217bb07beb = {
  id: "01a0c5f3-8d0f-7dc9-b2c3-d972f9cd707b",
  type: "page-type/image",
  slug: "image-762316217bb07beb",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman in soft early-morning light, wearing a loosely tied sheer robe that suggests rather than reveals, leaning against a sunlit window frame in a relaxed contrapposto pose with one shoulder higher, warm tousled honey-brown hair, soft warm brown eyes turned toward you with a relaxed inviting calm, natural real skin texture, intimate quiet bedroom, gauzy diffused golden light, shallow depth of field with soft bokeh, sensual but tender and unforced, close waist-up framing",
  seed: 660413,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
