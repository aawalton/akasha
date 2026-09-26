import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20c62b290a455314 = {
  id: "01a0c5f3-9f6d-7071-a517-3597dcf39237",
  type: "page-type/image",
  slug: "image-20c62b290a455314",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman with soft gentle delicate features, fair lightly-freckled skin, soft wavy light auburn hair loosely framing her face, gentle expressive grey-green eyes, wearing a cozy soft oversized knit sweater, holding a small notebook and a pen, understated natural quiet beauty; tender and quietly luminous, deeply observant and feeling, a soft thoughtful faintly wistful expression, a gaze that notices everything with warmth and tenderness, present and perceptive; curled in a rain-blurred window seat, soft grey daylight, raindrops streaking the glass, a steaming cup of tea, small stacks of notebooks, cozy and interior, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 7004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
