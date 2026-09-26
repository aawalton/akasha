import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ba3679e50dd8193 = {
  id: "019f23c5-bf18-74b1-b14b-35eb3455ba1c",
  type: "page-type/image",
  slug: "image-8ba3679e50dd8193",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic night scene in a hybrid banyan grove, solarpunk, photoreal. On the RIGHT EDGE of the frame, close and large: a woman dryad from the waist up, standing utterly still, facing the viewer with direct gaze, serene faintly uncanny composure, no smile — bark-brown skin with fine glowing gold circuit traces, dark twig hair worn forward over her chest, gentle luminous green eyes. Filling the LEFT HALF with calm dark space: an avenue of banyan aerial roots recedes into deep night like columns, each root wrapped with a thin line of glowing gold circuitry, thick black braided cables running along the forest floor toward a distant soft amber glow — no figures, no clutter, deep and quiet. One shared golden circuit joins her skin and the nearest root. Cinematic, intimate, photographic realism, not painterly.",
  seed: 7033,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
