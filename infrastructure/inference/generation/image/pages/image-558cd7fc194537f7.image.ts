import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image558cd7fc194537f7 = {
  id: "01a10674-5fea-7981-93bc-6ebac9be6cf9",
  type: "page-type/image",
  slug: "image-558cd7fc194537f7",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming beside the silver circle in the marble floor. A grey-haired East Asian priestess in her sixties with kind lines round her eyes, in plain grey robes, stands clutching a paper roll in both shaking hands, staring warily at the young woman before her. The pink-haired woman from the second image has stepped out of the circle toward her, stopping at a polite distance, one gloved hand lifted gently, palm open, her face soft and earnest and kind as she speaks to calm her. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Soft cool daylight from the dome. Medium two-shot from over the priestess's shoulder so the pink-haired woman's face reads, 50mm lens, shallow depth of field.",
} as const satisfies Image
