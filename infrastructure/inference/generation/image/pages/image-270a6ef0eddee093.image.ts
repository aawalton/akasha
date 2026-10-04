import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image270a6ef0eddee093 = {
  id: "01a10658-7cdd-7880-a901-44a398771f11",
  type: "page-type/image",
  slug: "image-270a6ef0eddee093",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the white stone and the columns of the Hall of Naming from the first image, but outside it now: the broad white stone steps up to its tall closed doors, its glass dome above catching misty light, the lake behind in white mist. A long quiet line of nervous young East Asian adults of twenty in their best clothes waits up the steps, holding their hands in careful places. The pink-haired woman from the second image stands last in the line, two steps below the others, looking up at the doors, gripping the strap of her small leather satchel in both fists, wide-eyed, anxious and hopeful. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Soft hazy morning light through mist. Wide shot from below the steps, 28mm lens, her face clear in the foreground.",
} as const satisfies Image
