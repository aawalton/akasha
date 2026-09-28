import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF1fe47b49d404807 = {
  id: "01a0e966-0532-763b-83cd-5a649a25da3d",
  type: "page-type/image",
  slug: "image-f1fe47b49d404807",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. After a run she sits on the grass of a wide park meadow with her knees drawn up, wearing only black running shorts and trainers, her sports top pulled off and held bunched against her chest, forearms resting on her knees hiding her chest. Her face is tipped up to the sun with eyes closed, catching her breath, a water bottle beside her. Wide shot from the side with the meadow and a line of oaks around her, bright late-morning sun. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
