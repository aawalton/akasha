import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26ad361116eda728 = {
  id: "01a0c5f3-f000-7e3f-af14-ccf66cedfb54",
  type: "page-type/image",
  slug: "image-26ad361116eda728",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — seated at a ledger-covered desk in a candlelit night archive, looking up from a ribboned manuscript directly at the viewer, quill in hand, ink on her fingers, full moon through the tall window behind, warm candlelight against cool moonlight, deep blue court dress",
  seed: 789669614,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
