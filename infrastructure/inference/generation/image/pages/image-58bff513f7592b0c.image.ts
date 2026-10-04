import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58bff513f7592b0c = {
  id: "01a1065b-4004-7d5b-95ad-d84927b63d3e",
  type: "page-type/image",
  slug: "image-58bff513f7592b0c",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome, the silver circle set in the white marble floor in its shaft of pale light. A grey-haired East Asian priestess in plain grey robes stands beside the silver circle reading names from a paper roll. On a wooden bench along the curved wall in the foreground, among a few other seated young adults, the pink-haired woman from the second image sits stiffly with her knees together and her hands clasped tight in her lap, staring at the silver circle, tense, breath held. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, small leather satchel across her chest. Pale wide light falling from the dome at nine in the morning. Medium shot of her on the bench from the side, the circle and priestess behind, 35mm lens, her face clear.",
} as const satisfies Image
