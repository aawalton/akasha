import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image871e26f2035efc9d = {
  id: "01a1065e-07cd-7e1b-8f5c-64af164ffff3",
  type: "page-type/image",
  slug: "image-871e26f2035efc9d",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome. In the silver circle stands an adult East Asian woman of twenty with a long dark plait in a plain blue dress, both hands pressed over her face, crying happy tears, a glowing pane of soft green light floating above her head with a single leaf glyph on it, no words. In the foreground on a wooden bench, the pink-haired woman from the second image claps hard with her gloved hands raised, beaming with joy, eyes bright and wet, leaning forward toward the circle. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, small leather satchel across her chest. Pale morning light from the dome and a soft green glow. Three-quarter view of her face from the side of the bench, the crying woman behind in the circle, 35mm lens, nothing lettered.",
} as const satisfies Image
