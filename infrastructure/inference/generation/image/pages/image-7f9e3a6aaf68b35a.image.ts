import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f9e3a6aaf68b35a = {
  id: "01a10654-d601-77b4-81be-72191480229d",
  type: "page-type/image",
  slug: "image-7f9e3a6aaf68b35a",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Change the scene to the bakery shop downstairs below the attic of the first image, keeping its old dark timber beams and warm wood: a hot little canal-side bakery full of flour dust, wooden trays of fresh golden bread and sticky honey buns coming out of a brick oven, shelves of loaves. A small round-faced East Asian widow baker in her sixties, sleeves pushed up, cheeks pink from the ovens, flour on her hands, presses a honey bun wrapped in a twist of paper into the hand of the pink-haired woman from the second image, flapping her other floury hand to refuse payment, kindly and firm. The pink-haired woman holds the bun in one hand and reaches toward her coin purse with the other, surprised and touched, smiling at the baker. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, a small leather satchel across her chest. Warm golden oven light, early morning. Medium shot, 35mm lens, both faces clear.",
} as const satisfies Image
