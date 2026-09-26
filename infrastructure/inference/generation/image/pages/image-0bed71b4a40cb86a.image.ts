import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0bed71b4a40cb86a = {
  id: "01a0c5f3-f000-71d7-99b7-bf1e9b9d2185",
  type: "page-type/image",
  slug: "image-0bed71b4a40cb86a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — an open book cradled in one arm against her chest, other hand resting on the page mid-line, direct unhurried eye contact with the viewer, soft knowing half-smile, wearing a fitted strapless deep-blue satin gown with bare shoulders and collarbones, moonlit night library, warm candle sconces behind, silver-blue light rippling in her hair",
  seed: 1156427019,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
