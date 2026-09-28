import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA3a970c8cec2f5e6 = {
  id: "01a0e96f-480d-7fcb-99aa-ba60e4ff6561",
  type: "page-type/image",
  slug: "image-a3a970c8cec2f5e6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-3c4d098a72b4b2ad",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her back on the bare grass of a sunlit park lawn with her knees bent and her bare feet planted flat, soles pressed into the grass, feeling the earth; her palms rest flat on the grass at her sides. Eyes closed, face tipped up toward the sky with a serene smile. She wears only faded cut-off denim shorts; her long hair is pulled forward over her shoulders and falls across her chest, covering it. Camera low at grass level looking up past her bare feet toward her face, big open blue sky with a few clouds, bright afternoon. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
