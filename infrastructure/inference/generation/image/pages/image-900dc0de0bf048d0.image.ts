import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image900dc0de0bf048d0 = {
  id: "01a0c5f3-f000-7ade-aa0b-9d7dd3772fa0",
  type: "page-type/image",
  slug: "image-900dc0de0bf048d0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen falling loose past her shoulders, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — holding an open book against her chest with both hands, direct calm gaze at the viewer, lips softly parted as if about to tell you what she found, deep navy satin slip dress with delicate straps, bare shoulders, candlelight from the left, full moon in the tall window on the right, night library shelves soft behind her",
  seed: 919761789,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
