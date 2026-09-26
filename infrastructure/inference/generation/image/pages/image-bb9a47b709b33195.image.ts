import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb9a47b709b33195 = {
  id: "01a0c5f4-03a4-7baf-8b63-0e3ae6294f28",
  type: "page-type/image",
  slug: "image-bb9a47b709b33195",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young Norse goddess, otherworldly and radiant, standing before a vast loom whose warp threads are strands of glowing golden light stretching up into darkness. Pale luminous skin lit from within like her divine bloodline, long bronze-gold metallic-sheened hair loosely pinned, intense molten-amber eyes with visible inner light looking directly at the viewer, calm knowing half-smile. She wears a gold halter-neck dress with the strap around her neck, bare shoulders and bare arms, fine metallic fabric catching the thread-light. One hand resting on the glowing threads, gold light running across her fingers like water. Ancient roots and stone well in shadow behind her, dramatic warm light against deep shadow, numinous, photoreal, head-and-shoulders",
  seed: 4106,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
