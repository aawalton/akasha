import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95c4ff85c583372d = {
  id: "019f1839-2c9b-7856-847b-a923b1d66c01",
  type: "page-type/image",
  slug: "image-95c4ff85c583372d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic full-body portrait of A Scandinavian woman with cool-toned pale skin, sculpted angular Nordic features, sharp high cheekbones, a strong defined jaw, pale grey eyes, and long ash-blonde hair. She wears a short white silk satin slip-style lingerie chemise with thin spaghetti straps, the soft silk clinging and gently translucent, one strap sliding off her shoulder. She kneels serene and upright, hands resting softly on her thighs, a worshipful uplifted expression, eyes lifted to the camera, reverent and radiant. Luminous divine lighting, warm radiant glow descending from above, gentle volumetric god-rays, ethereal heavenly atmosphere, soft bloom and haze, natural skin texture, cinematic, soft dark background, serene otherworldly holy beauty, sacred presence.",
  seed: 62305780,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
