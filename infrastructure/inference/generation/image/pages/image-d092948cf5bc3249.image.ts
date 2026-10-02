import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD092948cf5bc3249 = {
  id: "01a0fec3-ed03-7bd4-b1c3-cf9d69bce928",
  type: "page-type/image",
  slug: "image-d092948cf5bc3249",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1545279fc0280a45",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall, slim young woman of twenty-one with deep brown skin, bright dark eyes, high cheekbones, neatly shaped dark brows and a full mouth, her long black box braids gathered up high on her head in a ponytail. She wears a long tailored camel wool coat, open, over a fitted black knit jumper and black tailored trousers, small gold hoop earrings catching the sun, and a gold watch on her wrist. She leans one shoulder against the stone frame of a tall arched oak door, arms loosely folded, weight on one hip, one beautifully shaped brow raised high, her mouth curving in a delighted, amused smile, her eyes looking slightly off to the side of the camera as if watching someone walk past her. Behind her is the arched entrance of an old stone college great hall, its heavy oak doors open onto a dim interior, with a wet lawn and puddled path of a quad in front. Bright cold clean morning sunlight after a storm, a hard blue sky, sun low and from the side. Three-quarter length portrait, 85mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
