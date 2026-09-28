import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa6ff6a0252df44d = {
  id: "01a0e981-ae3b-7dcd-8b45-bb961319d313",
  type: "page-type/image",
  slug: "image-ca6ff6a0252df44d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-21fb7f3e04b32963",
  title: "Iris Catching Rainbows Among the Irises",
  persona: "persona/iris",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She lies on her side on the lawn beside a bed of purple and blue irises in a park, head propped on one hand, gazing up at the sky with a dreamy half-smile, not at the camera. A rainbow-dyed chiffon sarong is wrapped around her hips and drawn up diagonally across her chest and over one shoulder, covering her chest, with her other shoulder bare; a crystal prism pendant at her throat throws tiny rainbows across her skin. Camera at her level from the front at a slight distance, bright clear afternoon sun. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
