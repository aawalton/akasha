import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF04d2dcb186b7b68 = {
  id: "019f2d61-93db-7d24-91de-b577701ab22b",
  type: "page-type/image",
  slug: "image-f04d2dcb186b7b68",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties in a night studio, one hand gathering her wind-tangled dark brown hair away from her ear, head inclined as if the room just said something only she caught, eyes grey-green and direct on the viewer with a rising smile, lips just parted, moonlit canyon and mist beyond the glass wall, warm sun-weathered skin, brass headphones resting at her collarbones, wearing only a sheer gauzy ivory drape falling straight, clean deep V open to her navel, bare skin faintly visible through the gauze",
  seed: 1535371242,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
