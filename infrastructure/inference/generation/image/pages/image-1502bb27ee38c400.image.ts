import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1502bb27ee38c400 = {
  id: "01a0fd28-75ff-7cf4-8f97-12e790d3d2eb",
  type: "page-type/image",
  slug: "image-1502bb27ee38c400",
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
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall, slim, long-legged woman of twenty-three with narrow shoulders and a small chest, warm olive-brown skin, very dark brown eyes, thick straight black brows, full calm lips, and long wavy black hair pushed back off her face and falling past her shoulders. Change her clothes: she wears a fine dark charcoal knit jumper with a small round brass badge pinned at its collar, and grey wool trousers. She stands in the open wooden doorway of a small bright student kitchen, one shoulder near the doorframe, a clipboard held flat against her hip in one hand, the knuckle of her other hand just lowered from knocking on the frame. Her face is calm and composed, not quite smiling, a faint kindness at the corners of her mouth, and her dark eyes look straight into the camera with a steady, considering look, as if she has noticed something and filed it. Behind her runs a long corridor of dark wood and white paint with numbered doors down both sides. Cold bright morning daylight falls on her from the kitchen window, warm on her skin, the corridor behind her dimmer. Medium shot from the thighs up, 50mm lens at eye level, shallow depth of field, she filling the doorway and the frame.",
} as const satisfies Image
