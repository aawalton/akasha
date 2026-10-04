import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD1ff9a591701fa21 = {
  id: "01a106b1-854e-7a64-982e-c1e9821c9c28",
  type: "page-type/image",
  slug: "image-d1ff9a591701fa21",
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
    "Fantasy photorealistic candid photograph from the side, both women in profile, nobody looks at the camera. Keep the place from the first image, the timber guild hall, by the low grey chalk slates in its dim corner. The black-haired woman from the second image, on the left, stands very straight facing right, looking at the pink-haired woman with an even, cool, unreadable face, speaking, her right hand holding a thick black leather ledger book against her chest, raised slightly. The pink-haired woman from the third image, on the right, faces left toward her, turned half round, looking up at her with surprised, grateful eyes, lips parted. The second image's woman, with her exact face: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned delicate oval face, cool grey eyes under straight dark brows, small straight nose, soft full lips in a composed unsmiling line, flawless pale porcelain skin, glossy black hair scraped smoothly back into a severe low bun at the nape; slim build, small chest; a charcoal grey guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The third image's woman, with her exact face: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves. Only these two women in the frame. Warm late afternoon light from high windows. Medium shot at eye level, 50mm lens, shallow depth of field.",
} as const satisfies Image
