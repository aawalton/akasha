import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDac439a0bbfcbd28 = {
  id: "01a0c5f3-8d0f-7da0-8401-38f84c03f09e",
  type: "page-type/image",
  slug: "image-dac439a0bbfcbd28",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic cinematic portrait, chest-up: a beautiful Norse sentinel woman at first light of dawn, golden-white sunrise behind her. Feminine fur-and-leather Norse attire, a great curved horn slung at her shoulder. White-gold hair with a subtle prismatic sheen, luminous fair skin, serene unhurried vigilance — eyes fixed slightly past the viewer into the far distance, the hundred-league stare of the eternal watcher. Regal, warm, unshakable. Photographic realism, crisp detail, golden-hour rim light, shallow depth of field.",
  seed: 302,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
