import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image892752b8fa9b73d4 = {
  id: "01a10752-c8bf-7890-9e1a-3a78856d6ca9",
  type: "page-type/image",
  slug: "image-892752b8fa9b73d4",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge. The dark-haired woman from the second image sits on the warm marble, head bowed, pinching the top edge of her bath sheet and holding it a few inches away from her chest with two fingers to peek down inside it, the sheet still covering her completely from the front. She is caught mid-laugh, one short sharp disbelieving laugh, her wide mouth open, eyebrows raised, eyes on the inside of the sheet. She wears a white linen bath sheet wrapped from her armpits to her thighs; her olive skin, nose freckles and dark brown salt-tousled waves falling forward around her face as in the second image. Soft gold light from the oculus, steam off the green water behind her, wet marble shining. Medium shot from the front and slightly to one side at her seated eye level, 50mm lens, shallow depth of field.",
} as const satisfies Image
