import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a096b5da8307f24 = {
  id: "01a1076f-eb69-7fab-a0ac-455bca939167",
  type: "page-type/image",
  slug: "image-1a096b5da8307f24",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-faae24a0397f046e",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Fantasy photorealistic, candid photograph. The shore road along the Mere in summer sun, with nobody on it: a white dust road running between long purple rows of lavender rolling up the slope on the right, with fields of bright red poppies between them, and on the left tall green reed beds whispering beside the road, and beyond them the flat bright water of the Mere going all the way to the sky. The morning mist has burned off. Bees over the lavender. Warm bright mid-morning summer light, a clear sky. Nothing lettered. Wide shot along the road, 28mm lens, deep focus.",
} as const satisfies Image
