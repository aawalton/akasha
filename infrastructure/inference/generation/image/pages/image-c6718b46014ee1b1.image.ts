import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6718b46014ee1b1 = {
  id: "01a10687-c0a1-7750-9631-5911a2dd67a2",
  type: "page-type/image",
  slug: "image-c6718b46014ee1b1",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the dark old timber, beams and leaded windows of the guild hall from the first image, but move upstairs into the guildmaster's small office: a window over a sunny square, a long wooden table with maps pinned flat under glass, a rack of worn practice swords in the corner. At the table a grey-haired, broad-shouldered East Asian woman in her fifties with a scar through one eyebrow, in a plain dark tunic, sits reading aloud from a single printed sheet laid flat on the table, one broad finger on the line, her face stern and even. Across the table the pink-haired woman from the second image sits upright on a wooden chair with her hands folded in her lap, listening intently and respectfully, eyes on the sheet. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Bright noon light from the window. Medium two-shot across the table from the side, 35mm lens, both faces clear, nothing readable on the sheet.",
} as const satisfies Image
