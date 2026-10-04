import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe8ce278a875a9e3 = {
  id: "01a10686-29d6-7ef7-8173-72116eb784e5",
  type: "page-type/image",
  slug: "image-ce8ce278a875a9e3",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at the foot of the wide wooden staircase by the registration desk. A grey-haired, broad-shouldered East Asian woman in her fifties with a scar through one eyebrow, in a plain dark tunic and belt with a swordswoman's easy, balanced stance, stands on the bottom step looking down at the young woman before her with a long, level, measuring gaze, from head to boots. The pink-haired woman from the second image stands before her, looking up at her, hands folded on her satchel strap, nervous but polite, a small hopeful smile. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Warm midday sunbeams through high windows. Medium two-shot from the side, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
