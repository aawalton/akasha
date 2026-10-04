import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image06f6cd8070a02685 = {
  id: "01a1065e-f196-776e-ba3e-6d5621103911",
  type: "page-type/image",
  slug: "image-06f6cd8070a02685",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-fba84451f24bca40", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the timber and plaster of the first image, now a small bare tidy room off the guild hall with a wooden bench, a plain table, a cold iron stove and one high window. The black-haired woman from the second image stands very straight, inclining her head one exact degree, and lifts a black leather ledger an inch in one hand as she speaks, her face cool and unsmiling, her grey eyes fixed on the pink-haired woman from the third image, who stands an arm's length in front of her listening with earnest attention, nodding slightly. Behind them by the door a grey-haired broad-shouldered East Asian guildmaster in her fifties with a scar through one eyebrow watches. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips set unsmiling, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Pale light from the high window. Medium shot from the side, 50mm lens, both faces clear.",
} as const satisfies Image
