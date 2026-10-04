import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEf8de39ae62cc467 = {
  id: "01a1074e-9759-7f31-a9b7-1f41043f061f",
  type: "page-type/image",
  slug: "image-ef8de39ae62cc467",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image exactly, empty of people, close by the bronze lion-head spout. The bronze lion's head is set in the marble, its mouth open, spilling a thick steady rope of clear water into the great steaming pool of pale green water that fills the middle of the room, broad as a ballroom floor. Beside the great pool, cut into the marble, a smaller square basin of still, perfectly clear water lies calm with no steam above it: the cold plunge. Ripples spread from where the spout's water strikes the surface, catching the light. Steam drifts gold over the warm pool, white and green veined marble all around, wet stone shining. Soft gold light from the oculus above. Eye-level shot from beside the spout looking across both pools, 35mm lens, deep depth of field, nobody in the room.",
} as const satisfies Image
