import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE20cfe43112ab798 = {
  id: "019f1838-9248-78e9-ad2c-5ec848a53274",
  type: "page-type/image",
  slug: "image-e20cfe43112ab798",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: smooth flawless human skin with a delicate very subtle barely-there scattering of fine iridescent crimson-gold scales lightly tracing only the tops of her cheekbones, clean smooth arms, normal smooth bare human ears with no scales, smooth solid polished black-and-gold horns, warm amber eyes with vertical slit pupils, long dark red hair. She wears a striking high-fashion bright metallic red chainmail top: a high chainmail halter collar at her throat, a deep plunging keyhole neckline, draping gleaming vivid bright metallic crimson-red metal mesh with an elegant asymmetric scalloped hem, catching the candlelight. A dungeon master at a candlelit table with dice and an open rulebook, a sly warm knowing smile, looking directly at the viewer, chest-up framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8060,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
