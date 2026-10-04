import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image23bfbec58a3f503c = {
  id: "01a107a1-368b-71ab-a382-91a5ef3c115c",
  type: "page-type/image",
  slug: "image-23bfbec58a3f503c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d6638488ba297167",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Fantasy photorealistic, candid photograph. The Copper Baths on the lake shore in morning, with nobody in the frame: a great round dome of copper gone green with weather, smooth as an upturned bowl, with a little lantern tower on top, at the end of a long stone quay. White steam curls out of vents all round the base of the dome and drifts across the lake water in wisps. Stone steps lead up to a pair of tall doors with copper handles shaped like fish. Calm bright lake beyond, soft early summer morning sun. Nothing lettered. Wide shot from the quay, 28mm lens, deep focus.",
} as const satisfies Image
