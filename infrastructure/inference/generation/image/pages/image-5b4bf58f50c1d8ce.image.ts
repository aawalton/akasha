import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b4bf58f50c1d8ce = {
  id: "019f23e2-1f5c-7369-9137-ee7c39f7e1ee",
  type: "page-type/image",
  slug: "image-5b4bf58f50c1d8ce",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a young woman blacksmith with cat ears and a cat tail — real human skin, no fur, feline ears up through her hair, the tip of small sharp fangs showing in an easy confident half-smile. She stands at her forge at night, and the forge fire burns GOLDEN — pure warm gold flame, not orange — golden firelight playing over her skin and catching in her eyes. Dark hair tied back messily for work, a strand loose, her face clean and glowing in the firelight. She wears a short halter top, cropped high, her toned midriff fully bare, arms bare and capably strong, leather work gloves tucked in her waistband. Direct gaze at the viewer, playful spark, utterly at home. Cinematic, intimate, photographic realism, not painterly.",
  seed: 7207,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
