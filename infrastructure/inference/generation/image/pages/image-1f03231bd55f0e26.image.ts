import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1f03231bd55f0e26 = {
  id: "01a10675-fba0-7819-b1ec-39d3935c971a",
  type: "page-type/image",
  slug: "image-1f03231bd55f0e26",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-80f9dc44ffe50a7a",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the white stone and columns of the Hall of Naming from the first image, but outside it now on its broad white steps, the mist lifting off the bright lake behind. The pink-haired woman from the second image walks alone down the middle of the steps, a wide empty path opening around her, her face bravely composed but sad, eyes lowered a little, gripping her satchel strap. On both sides young East Asian adults in their best clothes have stepped back away from her, watching warily; on the top step an adult East Asian woman with a long dark plait in a blue dress stares down at the stone, her mother's arm around her shoulders. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Bright late-morning light through thinning mist. Wide shot from the foot of the steps looking up, 35mm lens, her face readable.",
} as const satisfies Image
