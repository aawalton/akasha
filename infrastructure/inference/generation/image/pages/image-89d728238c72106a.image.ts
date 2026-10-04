import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image89d728238c72106a = {
  id: "01a1064e-0483-7564-8028-a734a7aaa404",
  type: "page-type/image",
  slug: "image-89d728238c72106a",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, by the wooden crate of houseplants under the round window. The pink-haired woman from the second image kneels barefoot on the cold floorboards in front of the plant crate, leaning toward a pot of mint, pinching a sprig off its top leaves between finger and thumb, talking softly to the plants with a fond, earnest little smile, eyes on the mint. A fern, a small lemon tree and an aloe sit beside it. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs; slim build, small chest; she wears a plain white linen shift. Soft grey early morning light from the round window. Medium shot at her kneeling height from the side, three-quarter view of her face, 50mm lens, shallow depth of field.",
} as const satisfies Image
