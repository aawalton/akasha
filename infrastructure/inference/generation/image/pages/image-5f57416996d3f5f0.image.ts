import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f57416996d3f5f0 = {
  id: "01a10719-a906-706c-b342-ed125966d640",
  type: "page-type/image",
  slug: "image-5f57416996d3f5f0",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment on the long wooden benches along the curved wall. The pink-haired woman from the second image sits on the bench among a row of other nervous young people, her knees pressed together and both hands clasped tight in her lap, her back very straight. She looks out across the hall toward the silver circle, her eyes wide and her lips parted, holding her breath. In the middle of the marble floor, in the shaft of light under the dome, a grey-robed priestess stands beside the silver ring holding an open paper roll, and a thin young man stands alone inside the ring. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Nine in the morning, pale wide light pouring down from the glass dome onto the centre of the floor, the benches in softer shade. Medium shot from along the bench, her in the near foreground and the circle beyond, 35mm lens.",
} as const satisfies Image
