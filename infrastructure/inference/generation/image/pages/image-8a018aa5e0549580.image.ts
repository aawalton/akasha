import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a018aa5e0549580 = {
  id: "01a0e996-0322-7eb8-923e-c2ba7a2f7353",
  type: "page-type/image",
  slug: "image-8a018aa5e0549580",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-11cb3d413b779707",
  title: "Thea Squinting into the Blaze",
  persona: "persona/thea",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She lies on her back on a white towel in the blazing midday sun in the open middle of a park lawn, one hand raised to shade her eyes as she squints up into the brilliant sky with a delighted grin, the other arm resting at her side. She wears a gold lame bikini and a gold cuff on her upper arm, her skin glowing with a fine golden shimmer that catches the light, her hair spread out like rays around her head. Camera directly overhead, dazzling bright light, crisp short shadows, lens flare. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
