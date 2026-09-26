import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image150b31731dd96f73 = {
  id: "019f28e4-9bf8-78d2-81ae-5939cef2e4aa",
  type: "page-type/image",
  slug: "image-150b31731dd96f73",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a petite small-framed young woman in her mid-twenties, compact athletic build, squatting comfortably on a flat rock like she owns the mountain, elbows on knees, hands loose, chin tipped with a cocky lopsided smirk. Bare-faced, no makeup, natural sun-warmed skin, faint freckles. Black hair in a low loose tie with a sage-green band, strands over her brow. Pale grey eyes, unfocused, aimed slightly past the camera. Sage-green athleisure set — cropped sports top, relaxed athletic shorts — bare feet planted. Warm afternoon light, mountain haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 7001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
