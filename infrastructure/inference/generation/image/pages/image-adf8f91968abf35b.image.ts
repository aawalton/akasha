import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdf8f91968abf35b = {
  id: "019f2d45-9183-7289-abd0-b60c0e972cc9",
  type: "page-type/image",
  slug: "image-adf8f91968abf35b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid of a young woman in her mid-twenties at a mixing desk in a cozy home studio at night, tangled dark brown hair pushed behind one ear, warm weathered skin with faint freckles, grey-green eyes catching the console glow, oversized soft sweater in faded sage and sand tones, headphones half-on with one ear free, leaning in listening intently to a playback, lips parted, warm practical lights and wood paneling",
  seed: 1062853846,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
