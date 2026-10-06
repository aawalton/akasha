import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA3cdc648c7b74d5c = {
  id: "01a1133c-1683-7f67-a948-1e9f1cd7f3a3",
  type: "page-type/image",
  slug: "image-a3cdc648c7b74d5c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e28112b8475de798",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Photorealistic. She has pale skin with a dense dusting of freckles across her nose, cheeks, shoulders and arms, bright green eyes, thin arched copper brows, a heart-shaped face, a wide mouth, and thick copper-red hair piled up in a messy high bun with loose strands stuck to her neck and falling around her face. She is tall, five foot ten, long-limbed and slim. She wears an oversized faded sage green tee that falls to mid-thigh and has slid off one bare freckled shoulder, no bra under it, the hem hiding any shorts, and white sneakers. She stands squarely at the bottom of an exit ramp, one hand on her hip, chin lifted, her green eyes narrowed in a slow appraising look aimed just past the camera to the left, a sly wide grin spreading across her face. Behind her are the glass doors of a ride gift shop, a steel railed exit ramp, tropical jungle planting and a green coaster track above, and a few blurred park visitors. Midafternoon, bright hot Florida sun, crisp shadows. Framed from the knees up, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
