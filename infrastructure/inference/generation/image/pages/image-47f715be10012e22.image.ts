import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image47f715be10012e22 = {
  id: "01a106aa-a45c-7385-b80d-a669b4111e56",
  type: "page-type/image",
  slug: "image-47f715be10012e22",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, by the low grey chalk slates in its dim corner. Close two-shot: the pink-haired woman from the second image faces the blonde woman squarely, holding her eyes, speaking plainly and earnestly, her face open, sincere and serious, one gloved hand laid over her own heart. The blonde woman from the third image looks back at her, lips parted, her anxious face softening, her fingers loosening from the end of her braid. The second image's woman, with her exact face: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves. The third image's woman, with her exact face: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, bare hands, a too-big leather apron stained with burn marks, a belt of corked vials. Only these two women in the frame. Warm late afternoon light from high windows on their faces. Medium close-up from the side, 85mm lens, both faces in profile and three-quarter view, shallow depth of field.",
} as const satisfies Image
