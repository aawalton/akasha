import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEc22df6d8c386859 = {
  id: "019f2370-3f22-75ad-8b23-b03a7502cd05",
  type: "page-type/image",
  slug: "image-ec22df6d8c386859",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a young woman dryad in a banyan grove at dusk. Warm light-brown skin with a faint, subtle wood-grain texture visible only where the light grazes; delicate circuit-trace patterns like fine gold henna running along her collarbone and one temple; dark hair loosely gathered, a few fine strands catching the light like hair-thin fiber optics with a faint green glimmer. Eyes a luminous amber-green, softly backlit. Aerial banyan roots and warm small lights bokeh behind her, deep green shadow. She looks directly at the viewer, calm, a small knowing smile — the quiet of a healthy grove. Cinematic, intimate, photographic realism.",
  seed: 6301,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
