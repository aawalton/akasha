import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image88b71cacd0cbd717 = {
  id: "01a0e979-4afd-7d74-9b71-2e8c93a89380",
  type: "page-type/image",
  slug: "image-88b71cacd0cbd717",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-61b8b80051d63c96",
  title: "Eppie in the Shade of the Old Oak",
  persona: "persona/eppie",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits in the cool shade of a huge old oak on a soft blue blanket, hugging her bare knees to her chest, which hides it, her cheek resting sideways on her knees, looking toward the camera with a drowsy, shy smile. A slouchy oatmeal knit cardigan hangs open and has slipped down off both shoulders to her elbows, with nothing beneath, and a small silver locket on a chain hangs at her throat. Close three-quarter shot at her eye level, sunlit lawn glowing bright beyond the shade. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
