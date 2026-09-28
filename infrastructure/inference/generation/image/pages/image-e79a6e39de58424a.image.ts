import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE79a6e39de58424a = {
  id: "01a0e971-1094-77bb-ad28-b30d6b51be79",
  type: "page-type/image",
  slug: "image-e79a6e39de58424a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-199475ad0ec0a996",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her stomach on a canvas tool-roll blanket in a sunny park, propped on her elbows, tinkering with a small intricate brass clockwork bird in her hands with a tiny screwdriver, tongue between her teeth in concentration, eyes on the work. Her denim overall shorts are unbuckled with the bib folded down around her waist, her back bare to the sun, her chest pressed to the blanket and hidden; a delicate thin gold tiara pushed back in her hair. Camera from above at three-quarter view, tools and brass gears scattered on the canvas, warm mid-afternoon light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
