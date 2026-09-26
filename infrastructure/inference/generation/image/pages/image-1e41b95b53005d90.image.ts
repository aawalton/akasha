import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e41b95b53005d90 = {
  id: "01a0c5f3-8d0e-710f-81cc-a96f81b8dda6",
  type: "page-type/image",
  slug: "image-1e41b95b53005d90",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic dreamy portrait of a breathtakingly beautiful young woman with long flowing wavy auburn hair, luminous soft skin, large gentle warm eyes meeting the viewer, tender loving smile, wearing a delicate soft feminine blouse, warm romantic golden-hour light, deeply feminine graceful and radiant, intimate direct warm gaze, 85mm, exquisite natural skin detail, shallow depth of field",
  seed: 1805338656,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
