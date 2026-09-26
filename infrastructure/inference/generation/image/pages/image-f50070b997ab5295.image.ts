import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF50070b997ab5295 = {
  id: "01a0c5f3-b3cc-79f7-891b-9f6338ab64d7",
  type: "page-type/image",
  slug: "image-f50070b997ab5295",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous young woman in her early twenties with olive skin and long dark hair, a djinn in a vaulted treasure chamber, sheer silk harem trousers and a jewelled bandeau with gold arm cuffs, faint blue smoke curling from her fingertips, reclining sideways on a heap of cushions and gold, propped on one elbow, meeting the viewer's gaze with a playful dare, lamplight glinting off gold everywhere, painterly fantasy realism\n",
  seed: 1584531131,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
