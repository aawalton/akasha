import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image965a5121ca6bd925 = {
  id: "01a10646-aac9-78fb-ad98-f665624e3fe0",
  type: "page-type/image",
  slug: "image-965a5121ca6bd925",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling with the round window over the canal. The pink-haired woman from the second image lies in the narrow bed under the patchwork quilt, just woken, on her back, her hands knotted together on her stomach over the quilt, eyes wide open staring up at the beams, nervous and wide awake, lips pressed together. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs, a little tousled from sleep; slim build, small chest; she wears a plain white linen shift. Grey early dawn light through the round window, faint warm haze of baking bread rising from below. Medium shot from the foot of the bed, slightly above, 35mm lens, her face clear, soft depth of field.",
} as const satisfies Image
