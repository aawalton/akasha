import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA4bf32177527ca69 = {
  id: "019f1838-9ff4-7ab3-a713-3b92a931cbe2",
  type: "page-type/image",
  slug: "image-a4bf32177527ca69",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair loosely tied back with strands lifting in the wind, wearing a simple t-shirt and a canvas worker's apron, standing on a green hilltop at golden-hour dusk before her small cozy fantasy inn glowing warm behind her, looking toward the viewer with quiet proud weary warmth, the ordinary stubborn woman who built a home from nothing with her own hands, wind-blown hair, warm low sunlight, close-to-medium upper-body portrait with the inn and hill softly behind her, cinematic, photoreal, intensely detailed eyes, natural skin detail",
  seed: 942,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
