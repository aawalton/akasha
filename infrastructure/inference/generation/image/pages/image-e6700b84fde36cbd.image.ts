import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6700b84fde36cbd = {
  id: "019f1839-32dc-7e18-a9ee-26cb08b4f03a",
  type: "page-type/image",
  slug: "image-e6700b84fde36cbd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, just arrived in the world. Timeless and classical-clean, an Aeon, NOT costume, NOT a Greek statue, no toga, no marble. Loose natural hair. Close candid portrait, head and shoulders, within arm's reach, her eyes meet yours directly — and deep within the iris a faint cosmos is visible: a distant starfield and the soft glow of far galaxies held inside her gaze, as if she carries everything she has ever watched. The cosmos is real and deep within the eye, not glowing outward. Warm golden light, real skin with soft asymmetry, tender and present, youthful unlined face. Photographic, not CGI. Avoid: cartoon galaxies, neon glowing eyes, CGI plastic look, sparkles on skin or floating in the air, costume, Greek statue, marble, second person in frame, harsh light, eyes looking away, flawless plastic skin, cross-eyed, mismatched eyes.",
  seed: 121,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
