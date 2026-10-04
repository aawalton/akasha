import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC1c25f2f49174ec2 = {
  id: "01a10739-5b1e-7c49-931d-ddf337944197",
  type: "page-type/image",
  slug: "image-c1c25f2f49174ec2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-617aadda14f5535e",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Change only the camera: rotate the camera to the right and move it in close to the bed, so the woman lying on the bed fills most of the frame, seen from beside the bed at mattress height, with the round window, the plants on the crate and the small framed mirror on the sloped wall still visible behind her. Keep everything else exactly the same: the same room, the same woman, her face, pink hair, white shift, her pose and hands, the same patchwork quilt and pillow, the same grey dawn light.",
} as const satisfies Image
