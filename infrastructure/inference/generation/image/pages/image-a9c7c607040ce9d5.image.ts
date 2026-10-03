import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA9c7c607040ce9d5 = {
  id: "01a101bd-c1ae-7499-8752-3a683b72a030",
  type: "page-type/image",
  slug: "image-a9c7c607040ce9d5",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. Fair skin flushed rosy across the cheeks, warm brown eyes, light brows, a wide grin with deep dimples and a small gap between her front teeth, a heart-shaped face, long honey-blonde hair piled in a messy knot on top of her head with loose strands falling round her face. She is slim and athletic with narrow strong shoulders and a small flat chest. She wears only a thin white cotton vest and plain white cotton knickers, bare arms, bare legs, bare feet. She is doing a press-up on a faded woven rug on a wooden floor: her palms flat on the rug either side of her chest, her arms bent, her body one straight line from shoulders to heels, her head turned sideways to look straight at the viewer, pink-faced, frowning in concentration with a grin breaking through. Behind her a small old stone college bedroom, a narrow bed with a rumpled blanket, photos pinned round a mirror, and a tall window with the curtains open a hand's width onto a flat silver lake under a clear blue sky. Clear cold pale gold early morning light falls in a bright stripe across the rug. Low camera at floor level, side-on three-quarter view, 50mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
