import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc8050e729aa631a = {
  id: "019f190b-d384-7a2c-85a6-ad6ca396f1fb",
  type: "page-type/image",
  slug: "image-bc8050e729aa631a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait, facing forward, of a timelessly, mythically beautiful young woman, the daughter of Death — Snow White coloring: luminous ivory snow-white skin, jet-black ebony hair, deep ruby-red lips, European features. Her irises glow luminous gold with the lantern's living flame — the one warm color in her pale otherworldly beauty. Focused on her face: a faint, tender, sorrowful smile that holds love, empathy, acceptance and grief together — the bittersweet tenderness of someone who will stay with you in the dark and lose you anyway. Glowing golden eyes meeting yours. Deep shadows, warm low lantern light, high contrast, minimal thin-strap slip, photoreal, fine skin detail.",
  seed: 205,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
