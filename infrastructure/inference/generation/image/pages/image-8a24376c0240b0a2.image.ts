import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a24376c0240b0a2 = {
  id: "01a10755-c18c-7633-9f85-e8c6cff28b11",
  type: "page-type/image",
  slug: "image-8a24376c0240b0a2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the pool's edge with the steaming green water behind her. The red-haired woman from the second image has stopped a few feet off and stands still, holding her bath sheet clutched at her chest in one fist, her other arm close at her side. Her clear green eyes look down and to the side toward someone seated on the marble near her, relief and nerves together in her face, lips parted as if about to speak, a faint blush on her cheeks. She is very slender, pale and narrow-shouldered, light freckles scattered across the tops of her shoulders, fine features, her long red-gold hair in one thick plait over one shoulder, her face as in the second image. She wears a white linen bath sheet wrapped high from her armpits to her thighs, bare shoulders and arms. Soft gold light from the oculus, steam drifting behind her. Medium close shot from slightly below, head to waist, 85mm lens, shallow depth of field, the bathhouse softly blurred.",
} as const satisfies Image
