import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA84592c8bd98d134 = {
  id: "01a0c5f3-b3cb-7ccb-8bb8-0489ee4f4781",
  type: "page-type/image",
  slug: "image-a84592c8bd98d134",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a striking distinctive-looking young woman with a memorable characterful face, heavy natural freckles across nose and cheeks, deep auburn-red hair, slightly uneven authentic features that read as a specific real individual person, warm hazel eyes meeting yours directly with quiet delight, intimate candlelit room at night with soft warm glints, simple soft top, natural real skin texture with visible pores and subtle imperfections, present and alive, shallow depth of field with soft bokeh, close framing",
  seed: 391784,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
