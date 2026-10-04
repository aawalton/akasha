import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEac53ab5c8415879 = {
  id: "01a106c6-adaa-7694-b1ee-1adfbbc27b7c",
  type: "page-type/image",
  slug: "image-eac53ab5c8415879",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates. The small blonde woman from the second image stands awkwardly, twisting the singed end of one long braid round her finger, shoulders hunched, cheeks gone pink, murmuring a small sorry, glancing down at the pink-haired woman. The pink-haired woman from the third image sits on the dusty floor against the wall, a cloth-wrapped hand resting in her lap, looking up at her with gentle amused kindness. The blonde: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair smooth skin with a smudge of soot across one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked glass vials. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Warm afternoon light. Medium shot, 50mm lens, both faces clear.",
} as const satisfies Image
