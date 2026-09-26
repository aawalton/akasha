import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29acd68394316a88 = {
  id: "019f23fa-7bcf-7807-ab32-ac33b92917a7",
  type: "page-type/image",
  slug: "image-29acd68394316a88",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide night interior of an old blacksmith forge, photoreal. A young woman blacksmith (seen in profile, small in frame, standing at the anvil right of center) works by the light of a forge fire that burns pure GOLD — warm golden flame at the right edge throwing long amber light across the room. The forge interior recedes to the left: racks of hammers and tongs on dark timber walls, a brick hearth of banked coals glowing gold, high dark rafters with drifting sparks, and a wide doorway at the far left open to deep blue night. Warm gold against deep shadow, intimate, photographic realism, not painterly.",
  seed: 8101,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
