import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4d307802a016836e = {
  id: "01a0e964-01ca-7296-af30-face208d75be",
  type: "page-type/image",
  slug: "image-4d307802a016836e",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-2cd145459966657a",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. She is an ordinary human woman with no horns and normal human ears; add nothing to her head. She lies on her stomach in a patch of clover in a park, propped on her elbows, absorbed in reading an open paperback novel held in front of her, eyes on the page, not looking at the camera. Her bare back is to the sun and a patterned sarong is wrapped over her hips; her chest is hidden against the ground and by her arms. Camera low from the grass at three-quarter view from behind her shoulder, soft fresh morning light, dew on the clover. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
