import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1f54f4c5d8d2b8f1 = {
  id: "019f2dd3-18ee-732a-976b-bf6fb39035d6",
  type: "page-type/image",
  slug: "image-1f54f4c5d8d2b8f1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, long dark hair with deep emerald-green tones and an iridescent emerald-and-gold fall over one shoulder, pale green-grey eyes with round pupils, slender swept-back WHITE OPAL horns — milky with rose-green-gold fire flecks, an iridescent opal scale-glitter patch high on ONE cheek only, deep emerald-green halter-neck dress with the strap around her neck and bare shoulders. Standing in a grand collection gallery holding a small labeled artifact up to the lamplight with quiet joy, head slightly tilted as she examines it. Glass cases and brass-labeled curiosity drawers around her, warm intimate lamplight, open airy hall.",
  seed: 7108,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
