import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8e24071471527038 = {
  id: "019f2372-e78f-7365-b615-849c340ed4c7",
  type: "page-type/image",
  slug: "image-8e24071471527038",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad fused with technology, in a banyan grove at night. Smooth bark texture blends into the skin of her shoulders and neck, thin seams of warm green-gold light glowing between the bark plates like data-sap; small banyan leaves and fine aerial roots woven through her dark hair with tiny warm lights nested among them. Her eyes are a soft luminous green-amber — glowing gently, not neon. Warm brown skin, a calm small half-smile, direct warm gaze at the viewer — the ease of a healthy grove. Massive banyan trunks and hanging roots threaded with faint dark cables behind her, deep green darkness with warm firefly bokeh. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6302,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
