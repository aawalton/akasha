import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc62c2ca87b6cdef = {
  id: "019f2327-853f-77d8-a7a1-613b228e23d3",
  type: "page-type/image",
  slug: "image-dc62c2ca87b6cdef",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait of a woman in cool pre-storm daylight, head and shoulders, standing near a tall window. Ageless, calm, faintly knowing smile — grey-eyed in the ancient sense: large luminous storm-grey irises with an owl's steadiness, gaze direct to the viewer, as if she can already see the finished version of you. Dark hair with a low loose braid over one shoulder. A delicate golden chain at her hip suggesting a miniature bridle, gold buckles catching light. Elegant but practical dark wool and linen. Overcast silver light, photoreal, fine skin detail.",
  seed: 4102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
