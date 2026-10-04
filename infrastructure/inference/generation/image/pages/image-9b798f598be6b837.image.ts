import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b798f598be6b837 = {
  id: "01a10732-2c72-71ec-9098-e1ad11edf59b",
  type: "page-type/image",
  slug: "image-9b798f598be6b837",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the dark oak timber and warm golden interior of the hall in the first image, seen through its wide open front doors, but this moment is outside at the foot of its front steps on Brightwater Square: a great two-storey timber building under a roof of weathered green copper. Adventurers with packs, swords, bows and scuffed boots stream up and down the steps past her, talking and laughing. The pink-haired woman from the second image stands at the bottom of the steps, small among them, gripping her satchel strap in both gloved hands at her chest, looking up at the open doors with her chin lifted, taking a deep breath, nervous but resolved. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear in her rose-pink hair. Half past eleven in the morning, bright clear summer sunlight on the square and the green copper roof, warm lamplit gold inside the doorway. Medium-wide shot from slightly behind her and to one side, 35mm lens.",
} as const satisfies Image
