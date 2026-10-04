import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8960d3f8cc984cf6 = {
  id: "01a10689-c94f-7ee8-83e2-31ca3c1ea923",
  type: "page-type/image",
  slug: "image-8960d3f8cc984cf6",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the dark old timber and leaded windows of the guild hall from the first image, upstairs in the guildmaster's small office with maps under glass on the long table and a rack of practice swords in the corner. A grey-haired, broad-shouldered East Asian woman in her fifties with a scar through one eyebrow has looked up from the printed sheet in front of her, one scarred eyebrow lifted a little in surprise. Across the table the pink-haired woman from the second image nods seriously and earnestly, her hands folded on the table, her face open and sensible, a small approving smile, as if saying that is sensible. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, fingerless leather gloves, the strap of a small leather satchel across her chest. Bright noon light from the window over the square. Over-the-shoulder shot from behind the older woman so the pink-haired woman's face reads, 50mm lens, shallow depth of field, nothing readable on the sheet.",
} as const satisfies Image
