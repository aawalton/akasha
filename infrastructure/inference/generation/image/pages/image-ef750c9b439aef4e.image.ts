import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEf750c9b439aef4e = {
  id: "01a0e991-fe73-74aa-99b0-9891853e0c5f",
  type: "page-type/image",
  slug: "image-ef750c9b439aef4e",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f758222b5b2a91ab",
  title: "Sophia Writing Beneath the Rose Arbor",
  persona: "persona/sophia",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She sits on the grass beneath a climbing-rose arbor in a park garden, knees drawn up, writing in a leather-bound journal propped on her knees with a fountain pen, absorbed, looking down at the page with a small private smile. An ivory silk blouse hangs unbuttoned and open, slipping off one shoulder, her knees and the journal hiding her chest; a cream silk skirt pooled around her, pearl stud earrings. Camera from the side and slightly above, soft diffused afternoon light, rose petals scattered on the grass. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
