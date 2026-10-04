import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2f9da4e4eecaf9c = {
  id: "01a10722-db5f-7357-b5e2-b1048ce140e5",
  type: "page-type/image",
  slug: "image-d2f9da4e4eecaf9c",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and put this moment on the bare floorboards in front of the wooden crate of houseplants under the round window. The pink-haired woman from the second image kneels on the cold boards facing the crate in profile, leaning close to the pot of mint, pinching a small sprig of its top leaves between the finger and thumb of her right hand, her left hand resting on the edge of the crate. She talks softly to the plants with a small fond smile, her eyes on the mint. Beside the mint stand a feathery fern, a small potted lemon tree and an aloe. She is alone in the room. Her short rose-pink bob is loose and a little mussed, with no flower clip. She wears only a plain white linen shift with thin straps, knee length, her feet bare. Grey early dawn light through the round window falls on her and the plants, half past five in the morning, the rest of the room dim. Medium shot from the side at kneeling height, 35mm lens.",
} as const satisfies Image
