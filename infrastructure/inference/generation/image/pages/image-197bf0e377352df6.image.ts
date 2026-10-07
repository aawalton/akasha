import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image197bf0e377352df6 = {
  id: "01a11402-c508-799b-bfa2-6c46c51691b6",
  type: "page-type/image",
  slug: "image-197bf0e377352df6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8fb31fb9af094cb2",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, glasses, nose hoop, lips, skin and hair. Change the scene around her. Photorealistic photograph. Warm brown skin, dark brown almond-shaped eyes with sharp winged liner, round tortoiseshell glasses, a small gold nose hoop, a defined jaw, high cheekbones, full lips, long black hair in a high tight ponytail. She wears a plain black cotton T-shirt and short black cotton shorts, her legs bare, barefoot. She sits cross-legged on a made queen hotel bed, a sheet of printed paper turned to its blank back laid flat on her knee, writing on it carefully with a purple pen, three more capped pens in blue, green and red tucked in the pocket of her shorts, a pen-shaped gap behind her ear. Her head is bent over the page, her expression focused and precise, eyes down on her writing. Behind her is a bright retro resort motel room at night, a messy second bed heaped with clothes and a curling iron, a bare bright lamp, an open connecting door with a red cooler propping it and amber light glowing beyond. Camera: medium shot from slightly above at seated eye level, 50mm lens, her whole cross-legged figure filling the frame, shallow depth of field with the room soft behind her, no readable writing on the page.",
} as const satisfies Image
