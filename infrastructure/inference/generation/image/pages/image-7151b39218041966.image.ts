import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7151b39218041966 = {
  id: "01a10671-0f84-7a26-9726-58803e76014f",
  type: "page-type/image",
  slug: "image-7151b39218041966",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome, by the silver circle. The pink-haired woman from the second image stands in the silver circle and turns to a grey-haired East Asian priestess in plain grey robes standing a few steps away with a paper roll half lowered and her mouth open, speechless. The pink-haired woman speaks to her and gives her a sweet, bright, reassuring smile, one gloved hand lifted a little, open and friendly, her head tilted. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Cool clear light from the dome, the rest of the hall hushed and blurred. Medium two-shot in profile, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
