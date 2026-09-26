import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD87bb602218f4e08 = {
  id: "01a035de-ef93-7000-a141-bb68dd38d39c",
  type: "page-type/image",
  slug: "image-d87bb602218f4e08",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman, cool fair skin, pale grey eyes, dark hair to her jaw, delicate sharp features, slender willowy build, small breasts, narrow shoulders and narrow waist, fine-boned and delicate, graceful rather than voluptuous, wearing an unfastened black silk slip fallen to her elbows, standing in a room of tall mirrors where every reflection of her is doing something slightly different and none of them match her pose, her own body turned away from the camera while one reflection behind her leans forward to meet our eyes directly, an unsettling amused curious expression on the reflection, cold silver light, painterly character portrait, direct eye contact with the viewer, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 1978739641,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
