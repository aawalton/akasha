import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image015b605aaa6af16a = {
  id: "01a106ed-df74-7549-a0cf-0c1d867bbbfa",
  type: "page-type/image",
  slug: "image-015b605aaa6af16a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the city from the first image, but the scene moves inside the Tipsy Heron, a loud lantern-lit canal tavern with dark beams and a window onto the lit canal. At a small corner table with bowls of stew, the pink-haired woman from the second image reaches across and squeezes the sooty hand of the blonde woman from the third image, smiling warmly at her, eyes shining, glad right through. The blonde woman sits very still, cheeks pink, not quite meeting her eyes, a shy small smile. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves. The blonde woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, a smudge of soot on one cheek, blonde hair in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked vials. Warm evening firelight and lantern glow. Medium shot across the table, 50mm lens, both faces clear.",
} as const satisfies Image
