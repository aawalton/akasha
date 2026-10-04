import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe73d127fc1f4c19 = {
  id: "01a10711-d84d-7103-b11d-17d8897d3386",
  type: "page-type/image",
  slug: "image-ce73d127fc1f4c19",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, and put this moment on the floorboards by the wooden crate of houseplants under the round window. The pink-haired woman from the second image kneels on the bare boards in front of the crate, sitting back on her heels, leaning toward the plants as she talks to them. Her left hand rests on the edge of the crate; with the fingers of her right hand she pinches a small sprig of leaves off the top of the pot of mint. Her lips are parted mid-word, her expression earnest and fond, and she looks at the mint, not away from it. Beside the mint stand the feathery fern, the little potted lemon tree and the aloe. She is alone. She wears a plain white linen shift with thin straps that falls to her knees, bare arms, bare feet, her rose-pink hair a little tousled from sleep, no clip yet. Grey early dawn light, a little past five in the morning, comes through the round window onto her and the plants; the rest of the room is dim. Medium shot from the side at kneeling height, 35mm lens.",
} as const satisfies Image
