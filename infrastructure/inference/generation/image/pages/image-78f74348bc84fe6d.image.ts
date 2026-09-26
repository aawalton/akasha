import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78f74348bc84fe6d = {
  id: "01a0c5f3-8d0f-7568-ac4f-bbbd657bf74b",
  type: "page-type/image",
  slug: "image-78f74348bc84fe6d",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous young woman in her early twenties wearing a thin linen shift that has slipped off both shoulders and a heavy fur throw falling from her hips, blonde hair in loose braids, kneeling up on furs in a Norse longhouse at night, firelight on her skin, leaning toward the viewer with a slow inviting look, carved timber and hanging pelts in the warm dark, painterly fantasy realism\n",
  seed: 207758472,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
