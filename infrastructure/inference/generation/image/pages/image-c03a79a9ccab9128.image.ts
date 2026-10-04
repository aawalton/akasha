import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC03a79a9ccab9128 = {
  id: "01a1075e-9bdb-7b6b-9985-10f27abfd183",
  type: "page-type/image",
  slug: "image-c03a79a9ccab9128",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the far end of the hall, empty of people, now standing right before the doors. The doors are tall bronze doors, twice a man's height, shut flush, their surface dark, smooth and gleaming with a deep bronze patina, set in the white and green veined marble wall. Above them a long band cut deep into the white marble is filled with shining gold, glowing warmly in the light, an abstract gilded inlay of flowing carved strokes with no readable letters or words. The wet marble floor in front of the doors reflects the gold and bronze. Steam drifts gold through the light from the oculus far above, the edge of the green pool just visible at the bottom of the frame. Imposing and silent. Low-angle shot looking up at the doors from a few steps away, 24mm lens, deep depth of field, nobody in the room, no text.",
} as const satisfies Image
