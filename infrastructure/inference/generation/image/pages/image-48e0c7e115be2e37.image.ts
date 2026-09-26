import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48e0c7e115be2e37 = {
  id: "01a0c5f4-03a4-7276-ad35-b0bbd805ccb8",
  type: "page-type/image",
  slug: "image-48e0c7e115be2e37",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young Norse goddess, otherworldly and radiant, standing before a vast loom whose warp threads are strands of glowing golden light stretching up into darkness. Pale luminous skin lit from within like her divine bloodline, long bronze-gold metallic-sheened hair loosely pinned, intense molten-amber eyes with visible inner light, calm knowing half-smile. One hand resting on the glowing threads, gold light running across her fingers like water. Fine linen dress with bronze details, ancient roots and stone well in shadow behind her, dramatic warm light against deep shadow, numinous, photoreal, head-and-shoulders",
  seed: 4105,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
