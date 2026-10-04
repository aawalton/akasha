import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image617aadda14f5535e = {
  id: "01a10732-dc65-7904-96fc-25d9bc49b717",
  type: "page-type/image",
  slug: "image-617aadda14f5535e",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and put this moment in the narrow bed against the sloping wall. The pink-haired woman from the second image has just woken far too early and lies on her back on top of the patchwork quilt, her head on the pillow, both hands knotted together on her stomach, her eyes open and fixed on the dark beams above her, her lips closed, quietly nervous. She is alone in the room. Her short rose-pink bob is mussed from sleep and she wears no flower clip. She wears only a plain white linen shift with thin straps, knee length, her arms, shoulders, legs and feet bare. The floor is bare boards. The round window over the canal behind the plant crate is pale grey with the first dawn; the room is dim and cool. Medium shot from beside the bed at mattress height, 35mm lens.",
} as const satisfies Image
