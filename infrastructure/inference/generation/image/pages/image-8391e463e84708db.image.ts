import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8391e463e84708db = {
  id: "01a10758-14bb-70ad-89d1-e13496a78eb9",
  type: "page-type/image",
  slug: "image-8391e463e84708db",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the near end of the pool, the curving windowless marble walls rising all around. The red-haired woman from the second image stands with her sheet clutched at her chest in one fist and sweeps her free arm out toward the curving walls, palm open, her face frustrated and exhausted, her green eyes on the bearded man. The bearded man from the third image stands a step from her, holding his sheet at his hip, turning his head to follow her gesture along the blank walls. She wears a white linen bath sheet wrapped high from armpits to thighs; very slender and pale, light freckles on her shoulders, her long red-gold hair in one thick plait, face as in the second image. He wears a white linen bath sheet around his waist, bare chest; face, short dark buzzed hair and dark beard as in the third image. The marble walls show no window anywhere, only veined stone, heated benches and linen, and the shut doors far off. Gold light from the oculus, steam. Wide two-shot, 28mm lens.",
} as const satisfies Image
