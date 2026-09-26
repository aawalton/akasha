import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image41575e19003127ae = {
  id: "01a00fb3-24a6-7e3e-ba10-bc68807e1d04",
  type: "page-type/image",
  slug: "image-41575e19003127ae",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful muscular blacksmith woman in a smoke-filled forge, thick scorched leather apron over a loosely bound linen wrap, soot on her forearms and collarbone, hammer resting on the anvil, turning to face the viewer, molten orange light from the open furnace throwing sparks and hard shadow, painterly fantasy realism, ember glow\n",
  seed: 845241811,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
