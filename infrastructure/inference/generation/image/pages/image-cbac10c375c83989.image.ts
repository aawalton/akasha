import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCbac10c375c83989 = {
  id: "01a10723-90cc-7b6c-ad3a-e33bab9c05b8",
  type: "page-type/image",
  slug: "image-cbac10c375c83989",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment looking up from the silver circle toward the carved stone gallery and the small door at its far end. Up in the gallery, a tall woman in a good long dark coat walks unhurried along the balustrade toward the little door, pulling on her second glove, her back half turned, her face shadowed. In the near foreground, seen from behind and to one side, the pink-haired woman from the second image stands in the silver ring with her head turned up toward the gallery, watching the woman go, her lips parted and her gloved hands still at her sides, bewildered. A faint glowing pane of warm light with one looped glyph and no letters hangs above her head. On the benches below the gallery, faces are turned up toward the door. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright light from the glass dome on the circle, the gallery in cooler shade. Wide shot over her shoulder up to the gallery, 35mm lens.",
} as const satisfies Image
