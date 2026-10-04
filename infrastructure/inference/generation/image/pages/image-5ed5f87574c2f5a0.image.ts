import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ed5f87574c2f5a0 = {
  id: "01a1065c-a325-7ca1-9318-ff00264212d8",
  type: "page-type/image",
  slug: "image-5ed5f87574c2f5a0",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome. In the silver circle on the marble floor stands a tall young East Asian woman of twenty, very straight-backed, and above her head floats a glowing pane of soft golden light in the air with a single shining crossed-swords glyph on it, no words. In the foreground on a wooden bench by the wall, the pink-haired woman from the second image sits watching the glowing window, lips parted in wonder, her hands clasped tight in her lap, eyes shining, delighted for the stranger and nervous for herself. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, small leather satchel across her chest. Pale morning light from the dome and the warm glow of the window. Over-the-shoulder shot from behind her bench, her face in three-quarter view, 35mm lens, nothing lettered.",
} as const satisfies Image
