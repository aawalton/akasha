import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF238a75a58481a32 = {
  id: "01a00fc9-829e-72c4-a41a-16b961f56e26",
  type: "page-type/image",
  slug: "image-f238a75a58481a32",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning Persian woman on a palace roof terrace at high noon, layered gauze veils in saffron and rose lit through by the fierce sun so they glow translucent around her figure, heavy gold and turquoise jewellery, kohl-lined eyes holding the viewer's gaze, hand steadying a veil against the hot wind, desert city and blue tiled domes behind, painterly realism, blazing light\n",
  seed: 1873936681,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
