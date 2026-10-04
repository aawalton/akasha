import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8e2c80d9912e356a = {
  id: "01a10710-da46-712c-8e07-20baa5421f48",
  type: "page-type/image",
  slug: "image-8e2c80d9912e356a",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room, and put this moment in the narrow bed against the sloping wall. The pink-haired woman from the second image has just woken and lies on her back under the patchwork quilt, her head on a flat pillow, her hands knotted together on her stomach on top of the quilt, her eyes wide open and fixed on the dark beams of the sloped ceiling above her, her lips pressed together, nervous and wide awake far too early. She is alone in the room. She wears a plain white linen shift with thin straps, the quilt drawn up to her waist, and the small pink-and-white flower clip lies on the little table beside the bed. The round window over the canal is pale grey with the first dawn light, a little after five in the morning, and the room is dim and cool, with faint warm flour haze rising from the bakery below and the crate of houseplants under the window. Medium shot from beside the bed at mattress height, 35mm lens.",
} as const satisfies Image
