import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1cacf934c6fdd8de = {
  id: "01a0e96d-9c9c-7a3d-b499-ac7f07ebf4ff",
  type: "page-type/image",
  slug: "image-1cacf934c6fdd8de",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-50f66899f612c4bf",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her side on a pale lavender blanket near the edge of a park pond, propped up on one elbow, holding a tall glass of pink lemonade, gazing off across the water with a thoughtful look, not at the camera. She wears only a sheer white lace cover-up hanging open and slipping off her shoulder, her upper arm and the drape of the lace and her pose hiding her chest, and a lace bikini bottom. Camera at a low angle from in front of her, warm golden-hour backlight glowing through her hair and the lace. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
