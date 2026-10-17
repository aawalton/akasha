import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c54f09a03b860a3 = {
  id: "01a14bf4-56aa-727c-a74f-4d58d0f980e0",
  type: "page-type/image",
  slug: "image-9c54f09a03b860a3",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-53539502b9dffc84",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman and this exact picture: the same face, green eyes, brows, smile, freckles, skin, pointed ears, green-tinged wavy hair, gown, pose, framing, forest background and light. Change only two things. First, remove the ivy crown and the ivy leaves from her hair entirely, and in their place tuck five or six separate small fresh green birch leaves loosely into her hair, each a small toothed oval birch leaf on its own, with no vine, no wreath, no crown and no flowers. Second, make her body very slim and slight, with narrow shoulders, thin arms and a small flat chest under the gown. Everything else stays exactly as it is. Photorealistic portrait, sharp realistic detail, visible skin pores, natural film-like color.",
  createdAt: "2026-10-17T22:21:06.601Z",
  updatedAt: "2026-10-17T22:21:06.601Z",
} as const satisfies Image
