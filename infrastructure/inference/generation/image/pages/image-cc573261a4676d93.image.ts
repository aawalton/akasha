import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCc573261a4676d93 = {
  id: "01a10663-d9fc-7087-821d-afaadee5c4f3",
  type: "page-type/image",
  slug: "image-cc573261a4676d93",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming, the bright shaft of light falling from the glass dome onto the silver circle in the marble floor, dust turning in the light. The pink-haired woman from the second image stands alone in the middle of the silver circle, bathed in the light from above, her eyes shut tight, her face tipped slightly up, gloved hands clasped together at her chest, lips moving in a silent hopeful prayer, small and brave. Rows of watchers on benches along the walls are dim and soft in the background. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, small leather satchel across her chest. Bright cool light from the dome at ten in the morning, the hall around it in soft shadow. Medium full-length shot from slightly below, 50mm lens, her face clear and lit.",
} as const satisfies Image
