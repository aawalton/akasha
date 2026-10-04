import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0105d9d718895b0b = {
  id: "01a106c3-edd2-71f2-91ef-7ca5f34e6f37",
  type: "page-type/image",
  slug: "image-0105d9d718895b0b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-18b50fdd9b3aa1db", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at its quest board covered in pinned paper notices with only illegible scribbles. Keep both women's faces exactly as in their images. The small blonde woman from the second image holds a paper notice in both hands, reading it aloud, colour coming back into her face, a small shy almost-laugh on her lips. Beside her the pink-haired woman from the third image clasps her gloved hands together under her chin in pure delight, beaming as if handed a present, eyes shining, looking at the notice. The second image's woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron stained with burn marks, a belt of corked glass vials. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel. Only these two women in the frame. Warm mid-afternoon light from high windows. Medium close shot, 50mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
