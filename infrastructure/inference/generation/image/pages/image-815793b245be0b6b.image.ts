import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image815793b245be0b6b = {
  id: "01a0e98d-720d-7ec2-a359-07e32213a432",
  type: "page-type/image",
  slug: "image-815793b245be0b6b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-2338440d86cfd267",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She lies on her side on a crimson silk blanket under a flowering plum tree in a park, head resting on one hand, holding up a ripe peach and looking at the viewer with a warm, knowing smile. A fine red thread is tied around her little finger. Her red silk cheongsam is unfastened at the shoulder and slipped down off one side to her waist, her bare shoulder and back to the light, her upper arm and the fallen silk covering her chest, gold bangles on her wrist. Camera at her eye level from the front, warm golden-hour light, pink blossoms drifting down. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
