import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image969453b6884f7325 = {
  id: "01a10720-d2b2-7143-a2e1-4da8cb190179",
  type: "page-type/image",
  slug: "image-969453b6884f7325",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and put this moment in the narrow bed against the sloping wall. The pink-haired woman from the second image has just woken far too early and lies on her back in the bed under the patchwork quilt, her head on the pillow, both hands knotted together on her stomach on top of the quilt, her eyes wide open and fixed on the dark beams above her, her lips pressed together, nervous and wide awake. She is alone in the room. Her short rose-pink bob is mussed from sleep and she wears no flower clip. She wears a plain white linen shift with thin straps, the quilt drawn up to her waist. The round window over the canal behind the plant crate is pale grey with the first dawn, ten past five in the morning; the room is dim and cool, with a faint warm haze of baking bread rising through the old floorboards from the bakery below. Medium shot from beside the bed at mattress height, 35mm lens.",
} as const satisfies Image
