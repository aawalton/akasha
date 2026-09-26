import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8c2a94d5361329dc = {
  id: "01a0c5f3-690f-738f-a812-1730eb922920",
  type: "page-type/image",
  slug: "image-8c2a94d5361329dc",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a youthful sweet-faced young woman, late teens to early twenties, soft youthful face with petite delicate refined features, a small delicate nose and a small delicate mouth, LARGE WIDE-SET bright blue eyes, SHORT wavy dark brunette hair in a chin-length bob, deep dark brown hair, very fair flawless porcelain skin, perfectly clear smooth complexion, petite with a slim figure, reaching a gentle open hand toward the viewer, a warm inviting smile, wearing a soft revealing cream silk healer wrap, open across the shoulders and arms, warm golden dawn light, ultra detailed photoreal, sharp focus, no bird, no phoenix",
  seed: 1092971973,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
