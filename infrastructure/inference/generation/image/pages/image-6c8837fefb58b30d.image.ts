import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c8837fefb58b30d = {
  id: "01a0c5f3-690f-7c51-b518-7303da11bd81",
  type: "page-type/image",
  slug: "image-6c8837fefb58b30d",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a youthful sweet-faced young woman, late teens to early twenties, soft youthful face with petite delicate refined features, a small delicate nose and a small delicate mouth, LARGE WIDE-SET bright blue eyes, SHORT wavy dark brunette hair in a chin-length bob, deep dark brown hair, very fair flawless porcelain skin, perfectly clear smooth complexion, petite with a slim figure, looking up toward the dawn with radiant awe and joy, wearing a light draped cream healer robe, bare shoulders, gold sun motif, warm golden dawn light, ultra detailed photoreal, sharp focus, no bird, no phoenix",
  seed: 790396877,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
