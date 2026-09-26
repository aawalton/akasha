import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a1cc7d535824a44 = {
  id: "019f1838-d068-76ad-8436-f71bbf9cbd04",
  type: "page-type/image",
  slug: "image-1a1cc7d535824a44",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a photorealistic portrait photograph of an 18-year-old human young woman, petite, a thin fine lovely face with delicate refined features, vivid bright red hair in a sleek practical low braid over one shoulder, natural soft warm blue eyes believably human and not glowing or oversaturated meeting the viewer's gaze directly, fair skin lightly sun-warmed and faintly freckled, wearing tasteful refined makeup with softly defined eyes and a subtle warm lip, wearing a beautifully tailored charcoal-grey and deep teal riding habit, a fitted structured jacket with silver buttons over a high-necked cream blouse, fine leather riding gloves. She stands confidently in a sunlit stone stable courtyard, one gloved hand resting on a weathered wooden gatepost, weight on one hip, her body angled and her head turned to meet the viewer directly with a cool poised half-smile, self-assured and elegant. Soft natural daylight, a horse and stable softly out of focus behind her, crisp and confident, three-quarter length, cinematic, sharp focus on her eyes, natural realistic skin texture and freckles, highly detailed photorealism",
  seed: 41920011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
