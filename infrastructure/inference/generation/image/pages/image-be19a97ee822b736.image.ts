import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBe19a97ee822b736 = {
  id: "019f1839-29d5-7c4b-b07b-d1406b4a6eef",
  type: "page-type/image",
  slug: "image-be19a97ee822b736",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic full-body portrait of A Scandinavian woman with cool-toned pale skin, sculpted angular Nordic features, sharp high cheekbones, a strong defined jaw, pale grey eyes, and long ash-blonde hair. She wears an intricate strappy white lingerie set with delicate crisscrossing straps and soft cage detailing across the chest and hips, modern and sensual, white satin and fine straps. kneeling upright on both knees, hands resting lightly on her thighs, looking straight into the camera with calm direct serene eye contact. Luminous divine lighting, warm radiant glow descending from above, gentle volumetric god-rays, ethereal heavenly atmosphere, soft bloom and haze, natural skin texture, cinematic, soft dark background, serene otherworldly holy beauty, sacred presence.",
  seed: 575496749,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
