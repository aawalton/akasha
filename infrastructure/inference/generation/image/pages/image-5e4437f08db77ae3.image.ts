import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e4437f08db77ae3 = {
  id: "01a0c5f3-f003-7c1f-bea2-4469d2ff672b",
  type: "page-type/image",
  slug: "image-5e4437f08db77ae3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, early morning light. A beautiful young woman in her late twenties walking a gravel path through a solarpunk garden estate, coffee mug in hand — raised garden beds and vine-covered solar glass on either side. Copper-auburn hair in a loose braided crown, bright green eyes, light sun-freckles, cream linen shirt with sleeves rolled and sturdy garden trousers. Caught mid-stride turning toward the camera with a knowing, contented smile — the morning walk of someone who knows every plant by name. Dawn light streams past her like it is following her. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
