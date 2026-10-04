import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image87499de9c420f40e = {
  id: "01a10762-7c2c-70eb-8d82-8ae705d480f9",
  type: "page-type/image",
  slug: "image-87499de9c420f40e",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1", "image/image-b6fb75d3907f9395"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, before the tall shut bronze doors at the far end of the hall. The red-haired woman from the second image stands a little back from the doors with her sheet clutched at her chest, saying flatly that she tried, her mouth wry and weary, her green eyes on the dark-haired woman. The dark-haired woman from the third image stands right at the doors, one palm still flat on the bronze, turning her head back toward the red-haired woman, breathing hard, frustrated. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the third image. The dark bronze doors tower behind, a band of gold inlay above them with no readable letters. Gold oculus light, steam. Medium two-shot, 35mm lens.",
} as const satisfies Image
