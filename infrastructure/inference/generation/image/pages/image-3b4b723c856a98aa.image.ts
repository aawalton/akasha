import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3b4b723c856a98aa = {
  id: "01a10659-dfa1-773e-ac80-8a59d8f99c4d",
  type: "page-type/image",
  slug: "image-3b4b723c856a98aa",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the white stone of the Hall of Naming from the first image, outside on its broad white steps before the tall doors, mist over the lake behind. On the step above stands a frightened young East Asian woman of twenty with a long dark plait in a plain blue dress, shoulders hunched and trembling, hands clenched, pale. The pink-haired woman from the second image, one step below, touches the girl's elbow with one gloved hand and holds out a small green mint leaf to her with the other, looking up at her with a warm, kind, reassuring smile; the girl looks down at the leaf, startled. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, small leather satchel across her chest. Soft misty morning light. Medium shot of the two in profile, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
