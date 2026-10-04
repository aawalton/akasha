import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image678ab0069b41448c = {
  id: "01a10714-02b9-798e-97c6-0b8de83c24d9",
  type: "page-type/image",
  slug: "image-678ab0069b41448c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, and put this moment in front of the small scrap of mirror hanging on a nail on the plaster wall. The pink-haired woman from the second image stands facing the mirror, newly dressed, her right hand raised to her hair pinning a small pink-and-white flower clip above her left ear, her left hand smoothing the front of her top flat against her middle. She studies her reflection with a small shy pleased smile, lips just parted as if speaking to herself. She is alone. She wears a cropped cream halter top laced up the front with a neat bow, showing a strip of pale skin at her middle, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves and tall brown leather boots. The empty stool behind her has nothing left on it, and the bed is made. Soft grey-gold early light from the round window, ten to six in the morning, lights one side of her face and the room is still dim. Medium shot from slightly behind and to one side, her reflection small in the mirror, 50mm lens.",
} as const satisfies Image
