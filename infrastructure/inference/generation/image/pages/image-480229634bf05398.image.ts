import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image480229634bf05398 = {
  id: "01a0e99b-9be0-70ad-9f71-c4b28f7ff7f0",
  type: "page-type/image",
  slug: "image-480229634bf05398",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman, same face and hair. Film still, over-the-shoulder shot from behind and slightly to her side: she has just sat up on a black sand beach and turns her head back to look over her shoulder toward the camera, eyes wide, lips parted, alarmed. One hand braced in the sand. Her oversized grey t-shirt has slid off one shoulder, her long heavy dark red hair tangled with black sand. She wears black shorts sagging over black compression tights, feet bare. Past her, the surf of a wild blue sea rolls in. Bright morning sun from the sea side, rim-lighting her hair, deep shadows, fine sea spray in the air, teal and amber color grade.",
} as const satisfies Image
