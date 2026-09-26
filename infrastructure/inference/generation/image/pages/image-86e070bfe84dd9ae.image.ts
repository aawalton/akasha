import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86e070bfe84dd9ae = {
  id: "01a0c5f3-8d0e-7070-8a6f-01441f39eee1",
  type: "page-type/image",
  slug: "image-86e070bfe84dd9ae",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties in the cabin of a yacht at night during a storm, black satin slip clinging with thin straps off one shoulder, olive skin and long dark waves, braced against a polished wood bulkhead with one hand, looking at the viewer through her lashes, single swinging brass lamp casting moving warm light and rain streaking the porthole, painterly realism, sultry\n",
  seed: 278877282,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
