import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF96514257d222edd = {
  id: "01a1072a-afa2-772e-9931-99250ed7034d",
  type: "page-type/image",
  slug: "image-f96514257d222edd",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the white stone of the hall in the first image, but this moment is outside it, on the broad white steps below its tall open arched doors, above the lake. The pink-haired woman from the second image walks slowly down the middle of the steps, alone, her gloved hands holding her satchel strap, her face quiet and a little hurt, looking down at the steps ahead of her. On both sides of her the newly named young people have stepped back and stand pressed aside in small groups, leaving a wide empty lane down the middle, glancing at her and away. On the top step a young dark-haired woman in a plain blue dress stares down at the stone, her mother's arm around her shoulders. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Half past ten in the morning, the mist lifting off the lake into bright hazy sunlight, the white stone glowing. Wide shot from the foot of the steps looking up, 35mm lens.",
} as const satisfies Image
