import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image318cc45ffb22d6ab = {
  id: "01a0c5f3-f000-7f18-aaa9-777c1cb405ca",
  type: "page-type/image",
  slug: "image-318cc45ffb22d6ab",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — curled in a moonlit window nook with a book open on her knees, caught mid-page-turn looking toward the viewer, the full moon large in the leaded glass behind her, silver-blue iridescence rippling across her hair where the moonlight lies, cozy dark-blue shawl over an ivory nightdress",
  seed: 1630221423,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
