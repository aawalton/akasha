import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2e12ba71b8c5002a = {
  id: "01a0feaf-d253-720d-8d92-2623bd9632eb",
  type: "page-type/image",
  slug: "image-2e12ba71b8c5002a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e00a6036e99ea905",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall, slim, long-legged woman of twenty-three with narrow shoulders and a small chest, warm olive-brown skin, very dark brown eyes, thick straight black brows, full lips, and long wavy black hair worn down loose, wild and whipping sideways across her shoulders in a gale of wind. She wears a plain dark charcoal wool jumper, its sleeves and shoulders darkened with rain, and faded blue jeans, and no badge. She stands squarely in the middle of an old wooden-floored college corridor at night, facing the camera, her left arm flung straight out to her side at shoulder height, palm open, barring the way. Her face is calm, set and commanding, her mouth firm, her eyes looking straight into the lens. Behind her at the end of the corridor a tall old window has blown in, its panes smashed open to the black stormy night, rain sheeting in sideways, a pale curtain streaming out flat into the corridor like a flag, broken glass glittering in a wide spray across the wet floorboards at her feet. Warm yellow light from a single wall lamp falls across her face against the cold dark of the storm. Camera: medium shot at her eye level, 50mm lens, she fills the frame from the knees up, shallow depth of field.",
} as const satisfies Image
