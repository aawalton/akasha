import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9275168ddc0342cb = {
  id: "01a1068f-ef6b-796c-bfce-ca644d8e9aaf",
  type: "page-type/image",
  slug: "image-9275168ddc0342cb",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, by its party board of small black chalk slates on hooks. In the foreground stands the woman from the second image, alone and the only pink-haired person in the picture, stopped in the middle of the floor with her hands at her sides, her face flushing hot pink from the neck up, eyes lowered, stung and embarrassed. Behind her, out of focus, a tall adventurer reaches up and hangs a slate back on its hook turned to face the wall, and his party stares at their boots. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Warm afternoon light from high windows. Medium close shot, 85mm lens, her face sharp, background soft.",
} as const satisfies Image
