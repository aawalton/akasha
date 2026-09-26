import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80a19b6ec7aab278 = {
  id: "019f1838-9f8f-7e05-a8f4-2f4091979d63",
  type: "page-type/image",
  slug: "image-80a19b6ec7aab278",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair loosely tied back with a few soft strands loose, wearing a simple t-shirt and a canvas worker's apron, a warm fond look as she sets a steaming bowl down before the viewer, leaning in close across a worn wooden table, the cozy inn common room glowing behind her with hearth firelight and warm wooden walls, close upper-body portrait, 85mm, shallow depth of field, cinematic, intimate, photoreal, intensely detailed eyes, natural skin detail",
  seed: 912,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
