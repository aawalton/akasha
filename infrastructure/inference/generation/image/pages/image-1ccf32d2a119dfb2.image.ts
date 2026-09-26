import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ccf32d2a119dfb2 = {
  id: "019f1838-c70e-7cee-a344-3044f5e822cf",
  type: "page-type/image",
  slug: "image-1ccf32d2a119dfb2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a photorealistic portrait photograph of an 18-year-old human young woman, petite, a thin fine lovely face with delicate refined features, vivid bright red hair in soft loose waves half-down, natural soft warm blue eyes believably human and not glowing or oversaturated, fair skin lightly sun-warmed and faintly freckled, wearing a deep forest green princess-cut dress with gold embroidered trim and a square neckline leaving her arms bare, leaning in close and attentive toward you with her shoulders angled forward, fully focused on you, a warm affectionate genuine half-smile with a bright spark of life in her eyes, looking directly and warmly into your eyes with full genuine eye contact, warm hearth firelight from one side casting dramatic single-source chiaroscuro with deep warm shadow on the far side of her face, intimate close upper-body framing, cinematic, sharp focus on her eyes, natural realistic skin texture and freckles, highly detailed photorealism",
  seed: 41470011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
