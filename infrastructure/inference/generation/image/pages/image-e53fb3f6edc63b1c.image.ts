import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE53fb3f6edc63b1c = {
  id: "01a10678-7d7c-75e2-a033-18a10cf99ad1",
  type: "page-type/image",
  slug: "image-e53fb3f6edc63b1c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the timber and plaster of the first image, now a small bare room off the guild hall, its charcoal-grey door standing open onto the bright noisy main hall. The pink-haired woman from the second image is at the open door, turning back over her shoulder with a bright, warm, confident smile, one hand on the door frame, mouthing words as if repeating something to remember it. Just behind her, the tall black-haired woman from the third image has tucked a black leather ledger under her arm and is stepping after her, her face composed and quiet, eyes on the pink-haired woman. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. Warm light spilling in through the open door. Medium shot, 35mm lens, both faces clear.",
} as const satisfies Image
