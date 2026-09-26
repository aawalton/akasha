import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa3a741df4cd2782 = {
  id: "01a0c5f3-2541-7a26-8b10-5c1c8bdd8c74",
  type: "page-type/image",
  slug: "image-ca3a741df4cd2782",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a graceful fae sorceress, like a live-action movie elf, long pointed elf ears, fair pale skin with realistic texture, glowing golden-amber eyes with direct eye contact, long wild voluminous emerald-green hair, wearing a long elegant flowing pale frostweave mage robe trailing snow and ice crystals, holding a glowing quartz wand, wintry enchanted forest, cinematic magical lighting, 85mm, photorealistic",
  seed: 1002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
