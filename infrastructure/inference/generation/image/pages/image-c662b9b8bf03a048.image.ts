import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC662b9b8bf03a048 = {
  id: "01a106c3-0865-7eca-bc28-16dd5b355b8c",
  type: "page-type/image",
  slug: "image-c662b9b8bf03a048",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates. The small blonde woman from the second image stands by the slates, has just turned round and jumped in surprise, wiping her sooty hands on her apron, talking fast with a nervous apologetic smile, looking down at the pink-haired woman. The pink-haired woman from the third image sits on the dusty floor against the wall, looking up at her with friendly bright interest. The blonde: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair smooth skin with a smudge of soot across one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked glass vials. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Faint green haze, warm afternoon light. Medium shot, 35mm lens, both faces clear.",
} as const satisfies Image
