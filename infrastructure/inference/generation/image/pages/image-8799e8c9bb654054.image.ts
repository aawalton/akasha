import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8799e8c9bb654054 = {
  id: "019f1838-a4a5-7a85-94cd-dd731cc5f739",
  type: "page-type/image",
  slug: "image-8799e8c9bb654054",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, smooth fair skin, warm hazel eyes, light brown hair with a faint warm auburn tint, the left side of her head shaved in a clean sharp undercut with the rest swept over to one side, wearing a worn black leather jacket with brass studs and hand-stitched patches, a fearless crooked devil-may-care grin, eyes glinting with trouble, moody low neon-tinged light, dark background, close upper-body portrait, photoreal, cinematic, intensely detailed eyes, natural skin texture",
  seed: 9720011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
