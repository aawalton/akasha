import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb72e0be26ba568f = {
  id: "019f190a-2a34-7ee4-9951-c6540c0087c7",
  type: "page-type/image",
  slug: "image-bb72e0be26ba568f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait in near-darkness of a timelessly, mythically beautiful young woman, the daughter of Death — Snow White coloring: luminous ivory snow-white skin, jet-black ebony hair, deep ruby-red lips, European features. Her irises glow luminous gold with the lantern's living flame — the one warm color in her pale otherworldly beauty. Minimal thin-strap slip. Warmly lit by a low antique lantern; deep darkness around her; dramatic chiaroscuro shadows sculpting her face, high contrast. Serene, still, compassionate; her ancient gaze meeting the viewer with unconditional love. Otherworldly, pale, mythic, photoreal, fine skin detail, shallow depth of field.",
  seed: 205,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
