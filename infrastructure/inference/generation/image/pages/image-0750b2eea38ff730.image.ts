import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0750b2eea38ff730 = {
  id: "01a0c5f3-f000-7a1d-90f2-982ce7610ca4",
  type: "page-type/image",
  slug: "image-0750b2eea38ff730",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — holding an open leather-bound book against her chest, calm direct gaze at the viewer with a reader's knowing stillness, wearing a deep navy-blue satin dress with thin straps and bare shoulders, light and fluid fabric, candlelit library at night, full moon through the window catching the iridescence in her hair and horns",
  seed: 1567082108,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
