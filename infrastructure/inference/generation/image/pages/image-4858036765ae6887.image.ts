import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4858036765ae6887 = {
  id: "019f2d50-57c1-758e-ab59-a65102da1914",
  type: "page-type/image",
  slug: "image-4858036765ae6887",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties leaning slightly toward a studio microphone at night, mid-motion as if just turning to answer, moonlit gorge and mist soft through the glass behind her, tangled dark brown hair swept over one shoulder, warm sun-weathered skin, grey-green eyes locked directly on the viewer, wearing only a sheer gauzy ivory gown falling straight with a clean deep V-neckline plunging to her navel, nothing worn beneath the sheer fabric, bare skin faintly visible through the gauze, vintage headphones around her neck, lips parted mid-word, warm lamplight",
  seed: 2075504235,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
