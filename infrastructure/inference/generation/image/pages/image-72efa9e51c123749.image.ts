import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image72efa9e51c123749 = {
  id: "01a0c5f3-f003-75e9-ae14-dc399983238a",
  type: "page-type/image",
  slug: "image-72efa9e51c123749",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, sunrise. A beautiful young woman in her late twenties standing between rows of solar panels and flowering climbing vines on a solarpunk homestead. Deep sun-bronzed skin, dark curls streaked with honey-gold catching the light, luminous amber eyes, a radiant unguarded smile aimed straight at the camera. Simple warm work clothes, a pruning shear holstered on a leather belt. The sunrise light seems to gather on her — faint golden glow along her shoulders and cheekbones, as if she carries her own dawn. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
