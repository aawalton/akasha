import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0cc8e67e63aa7d00 = {
  id: "019f1838-e197-7cee-a481-d1c6922b83b6",
  type: "page-type/image",
  slug: "image-0cc8e67e63aa7d00",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "anime illustration in the art style of the Frieren Beyond Journeys End anime, cel-shaded clean lineart, a young ageless eternally-youthful elven girl with delicately pointed long ears, pale green eyes, very long straight silver-white hair gathered into two long ponytails tied high at the back of her head with the tails falling forward over her shoulders, soft bangs, wearing a white mage mantle with gold and black trim over a high-collared striped shirt, resting one hand on her tall wooden mage staff. Her eyes widen in expressive surprise and gentle wonder, mouth softly open, warm caring expression, the moment of truly seeing someone for the first time. Soft golden hour lighting, close portrait, blurred background.",
  seed: 70090011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
