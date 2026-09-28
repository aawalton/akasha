import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB53532c270593514 = {
  id: "01a0e966-cc65-7d33-9022-7a72d1f0106a",
  type: "page-type/image",
  slug: "image-b53532c270593514",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-db929a98a98dee9c",
  title: "Aine Crowned in the Wildflowers",
  persona: "persona/aine",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her back in a ring of tall summer wildflowers in a park meadow, wearing only a crown of daisies and poppies and a loose gauzy white skirt around her hips. Her long hair is spread out and drawn forward over her chest, covering it, and her hands rest in the flowers. Eyes closed, a small contented smile, basking. Camera directly overhead looking down, the flowers framing her, blazing midsummer noon light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
