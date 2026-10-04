import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFcedbf6bf9ec97c7 = {
  id: "01a106e7-51d6-7939-8d82-bfb060999bdf",
  type: "page-type/image",
  slug: "image-fcedbf6bf9ec97c7",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-18b50fdd9b3aa1db", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is inside the Tipsy Heron, a loud cheap adventurers' tavern by the canal, at a scrubbed wooden table. The blonde woman from the second image sits with her spoon in her hand, asking a question earnestly. The pink-haired woman from the third image has put down her spoon and thinks, honest and unsure. The blonde woman from the second image is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head, with a slim build and small chest, wearing a cream blouse with rolled sleeves under a too-big scorched brown leather apron, a belt of corked glass vials. The pink-haired woman from the third image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Noon, warm lamplight and daylight in a crowded tavern. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
