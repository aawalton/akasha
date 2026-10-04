import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image82c970034ba15ac0 = {
  id: "01a1076d-fa2b-73cf-9784-ab31bb1956f7",
  type: "page-type/image",
  slug: "image-82c970034ba15ac0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-129945c5ea14d2f9", "image/image-4245fb8b8d3d84d1"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the far end of the hall by the pool. The bearded man from the second image answers simply: he gives one small steady nod, his expression calm and sure, his eyes on the red-haired woman in front of him. The red-haired woman from the third image stands an arm's length away looking up at him, her lips parting in relief, her shoulders coming down a little, still flushed pink. He wears a white linen bath sheet around his waist, bare chest and shoulders; face, brown eyes, short dark buzzed hair and dark beard as in the second image. She wears a white linen bath sheet wrapped high from armpits to thighs, one hand at her chest; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the third image. Warm gold light from the oculus through drifting steam, the green pool behind them. Medium two-shot over her shoulder toward him, 50mm lens, shallow depth of field, no text.",
} as const satisfies Image
