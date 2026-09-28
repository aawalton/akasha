import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image74c0d578211df90b = {
  id: "01a0e9a6-9275-77d6-87e0-1741de20313a",
  type: "page-type/image",
  slug: "image-74c0d578211df90b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ec0e2bb40b74cfa7",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and features exactly as in the reference. She is an ordinary human woman with NO horns and normal round human ears; add nothing to her head. She sits on a paint-spattered canvas drop cloth on a sunny park lawn with her very long golden hair unbound and pooled all around her in the grass, painting a small watercolor on a board propped against her knees, a brush in her hand and a tin of paints beside her, looking at the painting in concentration. She wears paint-smeared denim cut-offs and a lavender laced bodice unlaced and loosened, slipping off her shoulders, her long hair falling forward over her chest covering it, a smudge of blue paint on her cheek. Camera three-quarter from the front at seated height, soft bright late-morning light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
