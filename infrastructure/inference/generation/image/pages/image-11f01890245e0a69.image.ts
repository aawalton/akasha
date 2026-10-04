import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11f01890245e0a69 = {
  id: "01a1068b-24b3-762a-8e74-6637101ec305",
  type: "page-type/image",
  slug: "image-11f01890245e0a69",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the dark old timber and leaded windows of the guild hall from the first image, upstairs in the guildmaster's small office, a rack of practice swords in the corner, old hand-drawn fantasy maps of an invented lake country pinned flat under glass on the long wooden table. The two women sit facing each other across the table. On the left, seen from behind her shoulder, a grey-haired, broad-shouldered East Asian woman in her fifties with a scar through one eyebrow looks up from a printed sheet, one eyebrow lifted in surprise. Facing her across the table, the pink-haired woman from the second image nods seriously and earnestly, her gloved hands folded on the table, her face open and sensible, a small approving smile, looking at the older woman. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, fingerless leather gloves, the strap of a small leather satchel across her chest. Bright noon light from the window. Over-the-shoulder shot, 50mm lens, shallow depth of field, nothing readable.",
} as const satisfies Image
