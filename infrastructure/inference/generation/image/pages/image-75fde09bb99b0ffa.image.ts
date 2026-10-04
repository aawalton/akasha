import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image75fde09bb99b0ffa = {
  id: "01a10682-d50e-77b2-acb4-5f494ac75446",
  type: "page-type/image",
  slug: "image-75fde09bb99b0ffa",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at the registration desk, the wide wooden staircase climbing to the gallery behind. A thin young East Asian man clerk with inky cuffs has risen from his stool and is hurrying away up the staircase two steps at a time, glancing back over his shoulder at her with a startled, uneasy face, his pen left standing in its stand by an open ledger. At the desk, in the foreground, the pink-haired woman from the second image stands alone, watching him go, her lips parted, her face bewildered and a little crestfallen, hands holding her satchel strap. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Warm late-morning sunbeams through dusty air. Medium shot from behind the desk, her face in three-quarter view, the clerk on the stairs behind, 35mm lens, nothing lettered.",
} as const satisfies Image
