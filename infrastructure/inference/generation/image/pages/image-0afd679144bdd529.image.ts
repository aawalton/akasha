import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0afd679144bdd529 = {
  id: "01a1017f-2a68-784d-8ccd-8a2fa3e02307",
  type: "page-type/image",
  slug: "image-0afd679144bdd529",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d9b83e18f151ce35",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She has fair skin flushed rosy across the cheeks, warm brown laughing eyes, light brows, a wide grin with deep dimples and a small gap between her front teeth, and long honey-blonde hair piled in a messy bun on top of her head with sleepy strands falling loose around her face. She is slim and athletic with narrow shoulders and a small flat chest. She wears a plain white cotton vest, sleeveless with a low scoop neck and thin straps, long enough to hang over her hips, and black running tights that she is tugging up over her thighs with both hands. She stands hopping on one bare foot beside an old white-painted iron radiator, her other knee raised, wobbling for balance, grinning straight at the camera with a bossy teasing look, as if ordering someone still in bed to get up. Behind her a small cosy college bedroom under a sloping ceiling, thick drawn curtains with cold grey dawn light showing only at their edges, family photographs pinned round a mirror, a pair of trainers on the floorboards. Cool grey early-morning light from the curtain edges mixed with a warm bedside lamp glow. Framed from the top of her head to her knees, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
