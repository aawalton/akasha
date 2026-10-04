import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE22032d10d534df5 = {
  id: "01a10763-7de3-72d9-b75c-350f81f15d94",
  type: "page-type/image",
  slug: "image-e22032d10d534df5",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-b6fb75d3907f9395"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, close beside the tall dark shut doors at the far end, the marble wall filling the background. The dark-haired woman from the second image has stepped back from the doors, breathing hard, and stands looking down at her own open palms held up in front of her, her brow knotted, her jaw tight, fierce and stubborn, close to angry tears. She is slim and slight, sun-warmed olive skin, a dusting of freckles over her nose, dark brown eyes, dark brown hair in loose salt-tousled waves falling forward, her face as in the second image. She wears a white linen bath sheet wrapped from her armpits to her thighs, bare shoulders and arms. Behind her the closed doors fill the frame edge, smooth and dark. Steam drifts in warm gold light from the oculus above. Close medium shot, head to waist, from the front and slightly to the side, 85mm lens, shallow depth of field, the background softly blurred, no text, no other people.",
} as const satisfies Image
