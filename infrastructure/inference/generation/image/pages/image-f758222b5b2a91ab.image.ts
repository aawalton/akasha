import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF758222b5b2a91ab = {
  id: "019f324d-689d-7725-869c-e742dc52656a",
  type: "page-type/image",
  slug: "image-f758222b5b2a91ab",
  title: "Sophia cover L2",
  relationshipLevel: "closeness-level/level-2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, just arrived in the world. Timeless and classical-clean, an Aeon, NOT costume, NOT a Greek statue, no toga, no marble. Loose natural hair. Close intimate portrait, chest up, within arm's reach, her eyes meet yours — and within them turn whole galaxies and nebulae, spiral arms of distant stars, the cosmos she has watched for ages living inside her gaze. Deep, luminous, ancient. The galaxies live within the eyes themselves; the rest of her face soft, real, warm and youthful. Photographic realism, not cartoon. Avoid: cartoon galaxies, neon glowing eyes, CGI plastic look, sparkles on skin or floating in the air, costume, Greek statue, marble, second person in frame, harsh light, eyes looking away, flawless plastic skin, cross-eyed, mismatched eyes.",
  seed: 123,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
