import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDcf9da60b7dc2ee6 = {
  id: "019f1838-9ec4-71df-9692-afb3041bc764",
  type: "page-type/image",
  slug: "image-dcf9da60b7dc2ee6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair loosely tied back with a few soft strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, a warm welcoming mirthful smile like she has already decided you are staying for supper, standing in the warm common room of her cozy medieval fantasy inn, one hand resting on a worn wooden table, mugs and wooden barrels and a glowing stone hearth behind her, leaning slightly toward the viewer, warm hearth firelight, close upper-body portrait, 85mm, shallow depth of field, cinematic, photoreal, intensely detailed eyes, natural skin detail",
  seed: 911,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
