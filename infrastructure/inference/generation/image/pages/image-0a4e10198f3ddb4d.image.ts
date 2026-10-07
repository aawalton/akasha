import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0a4e10198f3ddb4d = {
  id: "01a11402-0a5b-739f-9530-fd5c46d27e0b",
  type: "page-type/image",
  slug: "image-0a4e10198f3ddb4d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e010e57ff4e47b26",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, liner, lips, skin and hair. Change the scene around her. Photorealistic photograph. Fair skin, dark almond-shaped eyes with thin black liner, high cheekbones, full lips, small gold hoop earrings, very long straight black hair worn loose to her waist with a center part. She wears a plain grey cotton sleep shirt, long on her, falling to mid-thigh, loose at the shoulders, her legs bare, barefoot. She sits on the edge of a made queen hotel bed, calm and still, her right arm resting along the bed beside her as if around someone just out of frame, her left hand raised a little with two fingers lifted in a small quiet greeting, her face composed and unreadable, looking straight ahead toward a doorway. Behind her is a retro resort motel room at night, a lamp with a scarf draped over it giving a low warm amber glow, deep shadows in the corners, blackout curtains drawn. Camera: medium shot from across the room at seated eye level, 50mm lens, her figure from knees up filling the frame, shallow depth of field with the amber room soft behind her.",
} as const satisfies Image
