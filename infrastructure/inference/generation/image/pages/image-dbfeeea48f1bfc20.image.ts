import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDbfeeea48f1bfc20 = {
  id: "019f2dcf-86cb-7ad3-96dc-8b31e9361c4a",
  type: "page-type/image",
  slug: "image-dbfeeea48f1bfc20",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, warm chestnut-auburn hair with an iridescent opal-fire sheen glinting rose, green and gold, pale opal-grey eyes with round pupils, slender swept-back white opal horns milky with colored fire flecks, a faint scatter of iridescent opal scales high on her cheekbones. Standing in a cabinet-of-curiosities hall holding a small labeled artifact up to the lamplight, examining it with quiet joy, head slightly tilted. Dusty-rose fitted dress with delicate straps. Glass cases and brass-labeled drawers around her, warm intimate lighting.",
  seed: 7103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
