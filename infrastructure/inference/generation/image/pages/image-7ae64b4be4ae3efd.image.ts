import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ae64b4be4ae3efd = {
  id: "01a1075c-ab44-7a87-a5e2-ba9b026fa704",
  type: "page-type/image",
  slug: "image-7ae64b4be4ae3efd",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the near end of the pool. The red-haired woman from the second image stands with her hand tightened hard on the sheet at her chest, knuckles white, her other hand lifted a little as if tracing something carving itself, her green eyes wide and haunted, speaking low. The dark-haired woman from the third image stands close beside her, very still, staring at her face, lips parted, unsettled. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the third image. Behind them, far down the pool through the steam, a faint warm gold glow shines in a band over the distant doors, with no readable letters. Gold oculus light, steam. Medium two-shot, waist up, 50mm lens, shallow depth of field.",
} as const satisfies Image
