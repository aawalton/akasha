import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEbad41426e09b615 = {
  id: "019f23c4-2ab1-727d-a6d9-f025fb005302",
  type: "page-type/image",
  slug: "image-ebad41426e09b615",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic night scene in a hybrid banyan grove, solarpunk, photoreal. On the RIGHT THIRD of the frame, close and large: a woman dryad from the waist up, standing utterly still, facing the viewer with direct gaze, serene faintly uncanny composure, no smile — bark-brown skin with fine glowing gold circuit traces, dark twig hair worn forward over her chest, gentle luminous green eyes. The LEFT HALF of the frame is calm negative space: the massive banyan's trunk and aerial roots recede into darkness, roots braiding into thick black cables along the ground, faint gold circuit traces climbing the distant bark, a few small warm amber status-light knots glowing far off among the roots — quiet, dark, uncluttered. The same golden circuit pattern on her body continues onto the tree behind her. Cinematic, intimate, photographic realism, not painterly.",
  seed: 7001,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
