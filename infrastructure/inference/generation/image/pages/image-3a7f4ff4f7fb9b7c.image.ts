import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3a7f4ff4f7fb9b7c = {
  id: "01a10724-edad-7603-a525-e7c60cf9bac8",
  type: "page-type/image",
  slug: "image-3a7f4ff4f7fb9b7c",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and put this moment at the little rocking wooden table by the wall. The pink-haired woman from the second image sits on the three-legged wooden stool at the little table, bent over a sheet of paper, writing a letter with a dip pen held in her right hand, her left hand flat on the page to hold it still. A small glass inkpot is held steady between her bare knees. Her head is bowed and her eyes are on the words, her lips slightly pressed, thoughtful and a little hopeful. She is alone in the room. Her short rose-pink bob falls forward over one cheek, with no flower clip. She wears only a plain white linen shift with thin straps, knee length, her feet bare on the floorboards. A folded letter and the crate of plants under the round window are behind her. Grey-gold early light from the round window, half past five in the morning, the room still dim. Medium shot from the side at seated height, 50mm lens.",
} as const satisfies Image
