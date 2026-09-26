import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d8298fb2582b83d = {
  id: "01a035d5-d1d2-7000-9374-351d23a2f7dd",
  type: "page-type/image",
  slug: "image-2d8298fb2582b83d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman, cool olive skin, luminous pale-grey eyes, a living mane of small green and bronze snakes instead of hair, delicate sharp features, slender willowy build, small breasts, narrow shoulders and narrow waist, fine-boned and delicate, graceful rather than voluptuous, faint serpent scales at her temples and down her spine, wearing a length of grey linen wound low on her hips and a thin bronze torc, seated on a broken plinth in a garden of half-ruined statues with her body twisted toward the camera and one arm along the stone, a tired amused knowing expression, cold moonlight and cypress, painterly character portrait, direct eye contact with the viewer, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 1852047929,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
