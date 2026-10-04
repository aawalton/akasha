import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6495d55c5f93485c = {
  id: "01a106a6-fc03-7208-9d10-bc8f5b7bbe19",
  type: "page-type/image",
  slug: "image-6495d55c5f93485c",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, by the low grey chalk slates in its dim corner. The blonde woman from the second image stands facing the pink-haired woman, blurting out a question all at once, eyes wide and anxious, cheeks flushed under the soot, both hands clutching the end of one long braid, leaning forward a little, mid-word. The pink-haired woman from the third image stands in front of her, turned toward her, listening gently with a calm open face and a small reassuring smile. The second image's woman, with her exact face: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron stained with burn marks, a belt of corked vials. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Only these two women in the frame. Warm late afternoon light from high windows. Medium shot, 50mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
