import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4cb63546a54f4a77 = {
  id: "01a10760-71df-76b1-9b44-1062198749a9",
  type: "page-type/image",
  slug: "image-4cb63546a54f4a77",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, in front of the tall shut bronze doors at the far end of the hall. The dark-haired woman from the second image stands with her head tipped back, laughing loud and open, her wide mouth wide, eyes crinkled nearly shut, one hand on her hip and the other holding her sheet at her chest, her whole body shaking with the laugh. She is slim and slight, sun-warmed olive skin, a dusting of freckles over her nose, dark brown eyes, dark brown hair in loose salt-tousled waves falling down her back, her face as in the second image. She wears a white linen bath sheet wrapped from her armpits to her thighs, bare shoulders and arms. Behind her the bronze doors gleam dark, a band of gold inlay above them with no readable letters, and the dome rises into gold steam and white oculus light overhead. Medium shot, head to thighs, from slightly below, 50mm lens, shallow depth of field.",
} as const satisfies Image
