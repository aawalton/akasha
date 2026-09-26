import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5bae30b5b3741ddd = {
  id: "019f2374-aeb3-72b4-990a-642199d5734d",
  type: "page-type/image",
  slug: "image-5bae30b5b3741ddd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad fused with technology, standing before her equally hybrid banyan tree at night. HER: smooth bark texture blending into the skin of her shoulders and neck, thin seams of warm green-gold light between the bark plates, banyan leaves and fine roots woven in her dark hair with tiny warm lights, soft luminous green-amber eyes, warm brown skin, calm knowing half-smile, direct gaze. THE TREE: a massive banyan that is itself half machine — its hanging aerial roots thickening into braided dark cables as they descend and rooting into the soil, its bark grained with faint glowing circuit traces, knots in the trunk glowing softly like small status lights, seams of the same green-gold sap-light running up the wood. Tree and woman share one light. Deep green darkness, warm bokeh. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6320,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
