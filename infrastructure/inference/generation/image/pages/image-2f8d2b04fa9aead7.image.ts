import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2f8d2b04fa9aead7 = {
  id: "01a0fd4c-a178-7c11-b1d0-934bdba8b2cc",
  type: "page-type/image",
  slug: "image-2f8d2b04fa9aead7",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1545279fc0280a45",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall, slim young Black British woman of twenty-one with deep brown skin, bright dark almond eyes, neatly shaped brows, high cheekbones, a full mouth with a soft knowing smile, a smooth oval face, and long black box braids gathered into a high ponytail that falls down her back, a few braids sliding forward over one shoulder. She wears small gold hoop earrings, a slim gold watch on her wrist, and a fitted cream knit jumper. She sits across a long wooden refectory table from the viewer, leaning forward with her chin resting on one hand, her head tilted, her eyes steady and amused on the viewer's face, slowly reading it, flirting as easily as breathing, very pleased with herself. A lunch tray with a fork sits in front of her on the table. Behind her, a great hall with tall leaded windows pouring in pale midday light, long tables crowded with blurred young women eating, warm stone walls. Soft daylight from the windows across her cheekbones, warm golden highlights on her skin. Close shot across the table at her eye level, 85mm lens, shallow depth of field, her face, hand and shoulders filling the frame.",
} as const satisfies Image
