import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2378e2bc0f415a40 = {
  id: "01a10728-6873-714c-9ac1-326b930c48b8",
  type: "page-type/image",
  slug: "image-2378e2bc0f415a40",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment on the marble floor just outside the silver ring. The pink-haired woman from the second image has stepped out of the silver circle and stands an arm's length from a grey-haired priestess in plain grey robes, not too close; she leans her head toward the priestess and speaks gently, her gloved hands open and low in front of her in a soothing gesture, her face soft, kind and earnest. The priestess, a woman in her fifties with kind lines round her eyes, holds a paper roll that trembles in her shaking hands, and stares at the pink-haired woman warily, the way one looks at a strange dog that might bite. The empty silver ring gleams on the floor behind them, and blurred silent watchers fill the benches along the curved wall. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright pale light from the glass dome. Medium two-shot at eye level from the side, 50mm lens.",
} as const satisfies Image
