import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image716514a8b50c01e9 = {
  id: "01a1076e-8213-7caf-bf04-72468827e718",
  type: "page-type/image",
  slug: "image-716514a8b50c01e9",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head, with a slim build and small chest. She wears a cream blouse with rolled sleeves under a too-big scorched brown leather apron, a belt of corked glass vials, and boots; one braid is done and the other half done and coming loose, its tie held in her teeth. She has stopped dead in the middle of a long guild hall floor after running in, her apron still swinging, her goggles askew on her head, her bright blue eyes wide, staring ahead at something out of frame. Behind her the great doors stand propped open, long wooden tables and a quest board pinned with paper notices, lamps being lit along the beams. Early morning light through the doors. Nothing lettered. Medium full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
