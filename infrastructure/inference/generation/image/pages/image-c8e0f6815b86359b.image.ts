import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8e0f6815b86359b = {
  id: "01a0c5f3-9f6d-7fc4-b3e8-7ad6b577df46",
  type: "page-type/image",
  slug: "image-c8e0f6815b86359b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, two beautiful young women who have just turned toward you, both faces lighting up with delighted joy the instant they see you, leaning together cheek to cheek in a happy moment, clearly distinct from each other — one with dark wavy hair in a soft rust sweater, the other blonde in a cream knit — soft warm lamplight, eyes bright and open meeting yours, natural real skin with subtle imperfection, intimate cozy private setting, only the two of them in frame, photorealistic, candid, fine detail",
  seed: 1825341112,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
