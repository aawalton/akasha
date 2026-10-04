import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ef11630c0bdf2a7 = {
  id: "01a10734-7262-7ab9-8e86-05738db9d33a",
  type: "page-type/image",
  slug: "image-9ef11630c0bdf2a7",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, and put this moment at the long registration desk under its painted board, the hall now busy and noisy with adventurers behind. Behind the desk a thin young man with ink-stained cuffs bends over three open ledgers, pen moving, not looking up. The pink-haired woman from the second image stands at the front of the desk, facing the clerk, her back straight and her chin up, her gloved hands resting on the edge of the desk; she is speaking clearly and steadily, lips parted on a word, her expression brave and plain, a little flushed. A short line of adventurers waits behind her. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Late morning, warm golden light from the high windows slanting through dusty air across the desk and ledgers, the brass stamping press gleaming. Medium shot from the side of the desk, her and the clerk both in frame, 50mm lens.",
} as const satisfies Image
