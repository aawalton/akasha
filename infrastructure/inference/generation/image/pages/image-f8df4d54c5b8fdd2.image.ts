import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF8df4d54c5b8fdd2 = {
  id: "019f2373-c90e-7b8b-8496-019d243c0951",
  type: "page-type/image",
  slug: "image-f8df4d54c5b8fdd2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders, of a woman dryad fused with technology, in a banyan grove at night. Smooth bark texture blends seamlessly into the skin of her shoulders and the sides of her neck, thin seams of warm green-gold light glowing softly between the bark plates like sap made of data; small banyan leaves and fine aerial roots woven through her dark hair, a few tiny warm lights nested among them. Soft luminous green-amber eyes, gentle glow. Warm brown skin, calm knowing half-smile, direct gaze meeting the viewer — the deep quiet of a healthy grove. Close intimate framing, her face large in frame. Massive banyan trunk bark and one hanging root with a faint dark cable behind her, deep green darkness, warm firefly bokeh. Cinematic, photographic realism, not painterly.",
  seed: 6317,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
