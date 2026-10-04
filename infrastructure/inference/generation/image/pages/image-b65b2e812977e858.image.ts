import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB65b2e812977e858 = {
  id: "01a10756-eb17-7f9a-9d31-10e0cad556d1",
  type: "page-type/image",
  slug: "image-b65b2e812977e858",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the near end of the pool on the wet marble. The red-haired woman from the second image stands holding her sheet at her chest with one fist, tipping her head back over her shoulder toward the far end of the hall where the shut doors are, speaking quickly and low, her face drawn and tired. The dark-haired woman from the third image sits on the marble a few feet from her, looking up at her intently, one hand resting on her knee. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender and pale, light freckles on her shoulders, green eyes, her long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark salt-stiff waves, face as in the third image. Behind them steam drifts down the long pool toward the distant doors, gold light from the oculus. Medium two-shot from the side, 35mm lens.",
} as const satisfies Image
