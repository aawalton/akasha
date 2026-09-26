import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image55a889d15f28eb3d = {
  id: "019f1838-5adb-77df-84fa-fb4a194d98b0",
  type: "page-type/image",
  slug: "image-55a889d15f28eb3d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A green Irish hill at blue-hour dusk, a ring of torch-bearing figures circling the hilltop sunwise, a line of warm fire-light carried down through dark summer fields, deep blue-violet twilight sky with a last band of orange sun on the horizon, distant and atmospheric, mythic, painterly landscape, glowing embers and warm firelight against cool dusk, wide cinematic vista",
  seed: 60274466,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
