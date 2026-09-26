import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4745865b6b5e1f34 = {
  id: "01a0c5f3-f000-7244-838c-66e947b802e7",
  type: "page-type/image",
  slug: "image-4745865b6b5e1f34",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — holding an open leather-bound book against her chest, calm direct gaze at the viewer with a reader's knowing stillness, candlelit library at night, moonlight from a window catching the iridescence in her hair and horns, ink-blue gown with silver embroidery",
  seed: 1892477677,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
