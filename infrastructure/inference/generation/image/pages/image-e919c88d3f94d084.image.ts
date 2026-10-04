import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE919c88d3f94d084 = {
  id: "01a107a7-ac64-75c6-a2a3-c6bdefcb6468",
  type: "page-type/image",
  slug: "image-e919c88d3f94d084",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-18b50fdd9b3aa1db",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head, with a slim build and small chest; her blonde hair is wet and loose from its braids, no goggles. She wears a big rough white towel wrapped round her body up under her arms, her narrow shoulders bare and pink. She sits on the slatted cedar bench of a small round steam room tiled in white, with a slatted wooden bench round the wall, thick white steam in the air, fanning her crimson face with both hands, her blue eyes wide, mouth open on a word. Nothing lettered. Medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
