import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image052dcbaa76647116 = {
  id: "01a1073b-9db3-7557-af57-86427d5d9bd1",
  type: "page-type/image",
  slug: "image-052dcbaa76647116",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-c1c25f2f49174ec2",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep the first image exactly: the same camera, framing, room, round window, plants, mirror, quilt, pillow, light, her pose, hands, white shift and bare legs. Change only her face: give her the face of the woman from the second image, and open her eyes, wide awake and nervous, looking up at the beams above her, lips closed.",
} as const satisfies Image
