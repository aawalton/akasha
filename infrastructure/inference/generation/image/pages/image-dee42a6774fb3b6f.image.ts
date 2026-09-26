import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDee42a6774fb3b6f = {
  id: "01a0c5f3-690f-72ec-8f0d-82a462cecbb9",
  type: "page-type/image",
  slug: "image-dee42a6774fb3b6f",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a youthful sweet-faced young woman, late teens to early twenties, soft youthful face with petite delicate refined features, a small delicate nose and a small delicate mouth, LARGE WIDE-SET bright blue eyes, SHORT wavy dark brunette hair in a chin-length bob, deep dark brown hair, very fair flawless porcelain skin, perfectly clear smooth complexion with no freckles, petite with a slim figure, head tilted, hand near her heart, gentle caring warmth lit by curiosity, a soft knowing half-smile, eyes engaged with the viewer, wearing elegant flowing healer's robes — layered cream-white and warm crimson robes with gold sun embroidery, a radiant medicine-healer aesthetic, warm golden dawn light, ultra detailed photoreal, sharp focus, no bird, no phoenix",
  seed: 2127960684,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
