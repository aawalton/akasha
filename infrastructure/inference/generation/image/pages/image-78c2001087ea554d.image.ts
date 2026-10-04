import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78c2001087ea554d = {
  id: "01a10754-d64a-7c1f-b45f-2c462e2d84f6",
  type: "page-type/image",
  slug: "image-78c2001087ea554d",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, looking down the length of the great pool toward the far end. The red-haired woman from the second image walks barefoot along the marble edge of the pool toward the near end, emerging out of drifting steam, mid-stride, her bare wet feet on the shining stone. One fist clutches her bath sheet tight at her chest. Her face is tense and hopeful, eyes fixed ahead past the camera on the people at the near end. She wears a white linen bath sheet wrapped high from her armpits to her thighs; she is very slender, pale and narrow-shouldered, light freckles across her shoulders, clear green eyes, her long red-gold hair in one thick plait over her shoulder, her face as in the second image. Steam drifts gold through the light from the oculus over the green water beside her, the far wall and doors soft and hazy behind her. Full-length shot from the near end of the pool, 50mm lens, moderate depth of field.",
} as const satisfies Image
