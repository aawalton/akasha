import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b0de142abb37e7b = {
  id: "019efbd1-d698-7f76-910f-ec1293b884b2",
  type: "page-type/image",
  slug: "image-2b0de142abb37e7b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Dim stone chamber at the bottom of an ancient tower, lit by low amber firelight. A lone weary man stands over a collapsed heap of grey ash, gripping a heavy iron bar in both hands, breathing hard. In the ash, a single fist-sized cinder glows dull orange. Behind him a great stone slab has ground back from the top of a dark stairway, cool darkness spilling down. Ash-strewn floor, soot, shadow, painterly cinematic fantasy illustration, muted palette, warm key light against cold dark, atmospheric, dramatic",
  seed: 1553949069,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
