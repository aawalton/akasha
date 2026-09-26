import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image28f9c530715ace2e = {
  id: "01a0c5f3-efff-7262-948f-040b665830b2",
  type: "page-type/image",
  slug: "image-28f9c530715ace2e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "POV of a beautiful nude blonde woman braced on her hands directly above the viewer during slow deep lovemaking, her face close and filling the frame, golden hair curtaining down around both sides, blue eyes half-closed, lips barely parted, bare breasts brushing close, dim gold pre-dawn ember light, photorealistic, shallow depth of field, visible skin texture",
  seed: 1405648912,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
