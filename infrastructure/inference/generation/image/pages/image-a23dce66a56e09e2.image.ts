import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA23dce66a56e09e2 = {
  id: "01a10741-1728-7ee1-a885-8d466b677674",
  type: "page-type/image",
  slug: "image-a23dce66a56e09e2",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, and put this moment at the long registration desk beside the brass stamping press. The pink-haired woman from the second image stands at the desk holding up a small, newly stamped copper tag between the gloved fingertips of both hands, turning it in the light to see it shine, its face pressed with fine stamped marks too small to read. She gazes at it with quiet wonder, a soft proud smile, her eyes shining. Behind the desk, a thin young clerk with ink-stained cuffs has just let go of the press handle and watches her warily. On the desk beside her lies a little open purse with a small stack of silver coins and a few copper ones. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Half past noon, warm golden light from the high windows catching the copper tag and the brass press. Medium close shot from across the desk, her face and the tag in focus, 85mm lens.",
} as const satisfies Image
