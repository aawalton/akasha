import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image470f06f07f8a3d6f = {
  id: "01a1066a-66e1-7cec-aeb0-4cd1d3a5311a",
  type: "page-type/image",
  slug: "image-470f06f07f8a3d6f",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming, the white columns and glass dome soft and blurred behind. Close-up of the pink-haired woman from the second image standing in the silver circle, her face tipped up, reading the glowing violet pane above her head very slowly and carefully, eyes narrowed in concentration, lips moving as she spells it out under her breath, a small worried crease between her brows, perfectly composed and careful rather than frightened. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, the strap of a small leather satchel across her chest. Soft violet glow on her face from above mixing with cool daylight from the dome. Head-and-shoulders close-up from slightly below, 85mm lens, very shallow depth of field, nothing lettered.",
} as const satisfies Image
