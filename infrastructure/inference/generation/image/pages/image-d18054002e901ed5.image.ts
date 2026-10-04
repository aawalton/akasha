import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD18054002e901ed5 = {
  id: "01a106c0-4277-726b-8dfe-fa9d4a007594",
  type: "page-type/image",
  slug: "image-d18054002e901ed5",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at its quest board covered in pinned paper notices with only illegible scribbles. Keep both women's faces exactly as in their images. The pink-haired woman from the second image turns with a bright, deliberately cheerful smile, raising one gloved finger as if announcing a choice, while her eyes glance kindly sideways at the small blonde woman. The small blonde woman from the third image stands close beside her, pale and tense, her fingers stopped still on the corks of the glass vials at her belt, looking up at the pink-haired woman with sudden relief. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel. The third image's woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, very pale skin with a smudge of soot on one cheek, blonde braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron stained with burn marks, a belt of corked glass vials. Only these two women in the frame. Warm mid-afternoon light from high windows. Medium shot, 50mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
