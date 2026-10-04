import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf8c9417f00093e7 = {
  id: "01a10742-ad3b-7228-a82a-e48a4f2000ce",
  type: "page-type/image",
  slug: "image-bf8c9417f00093e7",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, and put this moment at the plain door in the far wall that is painted charcoal grey, at the end of the long quest board, with a small clear space of empty floor around it. A grey-haired woman in her fifties, broad-shouldered, in a plain dark leather doublet with a sword belt and a thin scar through one eyebrow, stands at the door with her palm laid flat on it, looking down at the girl beside her with a grave, steady look. The pink-haired woman from the second image stands close at her side, looking at the charcoal door, her gloved hands holding her satchel strap, her lips pressed together, apprehensive but brave. Passing adventurers in the busy hall behind them give the door a little berth. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. A quarter to one in the afternoon, warm golden light from the high windows slanting through dusty air. Medium two-shot from the side, the charcoal door filling one side of the frame, 35mm lens.",
} as const satisfies Image
