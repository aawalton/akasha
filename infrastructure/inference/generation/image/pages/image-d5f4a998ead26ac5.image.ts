import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD5f4a998ead26ac5 = {
  id: "01a10665-7344-7fe9-86cf-5718f66d1cf6",
  type: "page-type/image",
  slug: "image-d5f4a998ead26ac5",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-80f9dc44ffe50a7a",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome, standing in the silver circle. The pink-haired woman from the second image has just opened her eyes and looks straight up, head tipped back, at a glowing pane of warm violet-and-rose light floating in the air just above her head, marked with one strange shining glyph of looping threads, no words. Her face is blank with confusion, lips parted, eyebrows drawn slightly together, the glow lighting her face from above. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel across her chest. Bright cool light from the dome mixing with the violet glow. Close-up from slightly below and to the side, head and shoulders with the glowing pane above, 85mm lens, shallow depth of field, nothing lettered.",
} as const satisfies Image
