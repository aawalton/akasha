import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image345439d5259644d5 = {
  id: "01a1076c-965f-7aeb-a3a2-eeb4162325f0",
  type: "page-type/image",
  slug: "image-345439d5259644d5",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1", "image/image-129945c5ea14d2f9"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the far end of the hall by the pool. The red-haired woman from the second image makes herself look straight up at the bearded man, her chin lifted, her green eyes steady and serious though her face is still flushed pink, holding her sheet at her chest with both hands, asking him a plain question. The bearded man from the third image stands an arm's length in front of her, looking down into her face, quiet and attentive. She wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. He wears a white linen bath sheet around his waist, bare chest and shoulders; face, short dark buzzed hair and dark beard as in the third image. Steam drifts gold between them in the light from the oculus, the green pool behind. Medium two-shot in profile facing each other, waist up, 50mm lens, no text.",
} as const satisfies Image
