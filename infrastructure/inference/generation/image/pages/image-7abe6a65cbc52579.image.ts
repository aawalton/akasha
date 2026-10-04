import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7abe6a65cbc52579 = {
  id: "01a1066d-b879-708d-bd94-56625feb8683",
  type: "page-type/image",
  slug: "image-7abe6a65cbc52579",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming, the carved stone gallery running round the upper wall with the small door at its far end. Up in the gallery an elegant East Asian woman in a good long dark coat walks unhurriedly along the balustrade toward the little door, pulling on a black glove, her back half turned, cold and composed. Down below, small in the foreground, the pink-haired woman from the second image stands in the silver circle looking up over her shoulder at the departing woman, her face puzzled and a little hurt, lips parted. Benches of seated people below all have their heads turned up toward the gallery. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Cool still light from the dome. Wide shot from low on the floor behind her shoulder looking up to the gallery, 28mm lens, both figures readable.",
} as const satisfies Image
