import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf2dafd5baa6b531 = {
  id: "01a0e99c-41c8-7019-b594-7f4feb595f0b",
  type: "page-type/image",
  slug: "image-cf2dafd5baa6b531",
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
    "Replace the background with a black volcanic sand beach at the edge of a wild jungle island, surf breaking behind her, a smoking mountain in the far distance under a clear blue sky. Change her clothes to an oversized dark grey t-shirt slipping off one shoulder, loose black shorts over black leggings, barefoot. Change her pose: she is sitting in the sand with her knees drawn up, one arm around her knees, the other hand lifted in front of her, looking at it in confusion. Relight her with bright harsh tropical sunlight from above to match the beach. Keep her face, freckles and hair identical.",
} as const satisfies Image
