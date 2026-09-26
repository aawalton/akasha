import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8b27167fa0ed54d = {
  id: "019f1839-3d5d-7be6-af76-468f5dfea103",
  type: "page-type/image",
  slug: "image-a8b27167fa0ed54d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic waist-up portrait photograph of a young woman, Caucasian, warm wavy brown hair tousled from heat, natural blue eyes, pretty face, a calm confident alive expression with a faint warm half-smile, looking directly into the camera, a subtle spark in her eyes. A princess and mechanical engineer in forge mode in a high-fantasy solarpunk world. She wears the fine delicate cream silk-and-lace underlayer chemise of her princess ball gown — elegant, lace-trimmed, soft and a little revealing, slipping off one shoulder, clearly a princess's underdress and not a peasant shift — cinched at the waist with a simple brown leather work belt with tools. Brass goggles up in her hair. Warm forge-fire glow, a solarpunk forge of brass and flowering vines behind her. Photorealistic, hyperrealistic, realistic detailed skin, shot on DSLR 85mm, shallow depth of field, cinematic warm firelight, sharp focus.",
  seed: 4350,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
