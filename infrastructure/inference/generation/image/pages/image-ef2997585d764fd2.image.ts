import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEf2997585d764fd2 = {
  id: "01a10650-13a6-7c04-9cc1-5ef5a7401316",
  type: "page-type/image",
  slug: "image-ef2997585d764fd2",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, at the little wooden table by the wall. The pink-haired woman from the second image sits on the three-legged stool at the table, an inkpot held still between her knees, a pen poised above a sheet of letter paper, looking down at the page with a soft, wistful, hopeful expression, lips slightly parted as if choosing the words. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs; slim build, small chest; she wears a plain white linen shift, barefoot. Pale early morning light from the round window falling across the table and paper. Medium close shot from the side at table height, 50mm lens, her face and the letter in focus, shallow depth of field, nothing on the paper readable.",
} as const satisfies Image
