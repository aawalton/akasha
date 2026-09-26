import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image49eafa6fd6d16e09 = {
  id: "019f1838-7756-77d1-bd5a-b53808afc772",
  type: "page-type/image",
  slug: "image-49eafa6fd6d16e09",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a Black woman with deep brown skin and soft natural curls, genuine warm open smile, kind attentive eyes looking toward the viewer, soft diffused natural daylight, wearing a soft warm-toned blouse, gentle and alive, candid and personal, shallow depth of field",
  seed: 1753302110,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
