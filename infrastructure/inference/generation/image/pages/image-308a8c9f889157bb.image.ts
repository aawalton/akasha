import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image308a8c9f889157bb = {
  id: "01a1133b-55fb-7005-a626-108046a1b94e",
  type: "page-type/image",
  slug: "image-308a8c9f889157bb",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd7cf9dd1f73a977",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Photorealistic. She has light olive skin gone gold in the sun, dark brown almond eyes, straight defined dark brows, an oval face with soft cheekbones, full lips, almost no makeup, and long sleek jet black hair pulled up in a high braided ponytail that hangs down between her shoulder blades. She is slim and athletic with a small chest and a flat toned bare stomach. She wears a matching pale sky blue set: a square-neck sports bra and high-waisted compression shorts that stop at mid-thigh, and white running shoes. She holds a big scuffed water bottle covered in stickers in one hand, and a phone in the other, lowered from her face. She stands a step back with her weight on one hip, slightly out of breath, cheeks flushed pink, smiling a small shy sweet smile with one corner a little crooked, her eyes glancing down and away toward the steel rail. Behind her runs a gray switchback queue of black chain and steel railing on pale concrete, half in shade under jungle trees, a green coaster track high above against a blue sky. Early afternoon, hot bright sun with dappled leaf shade on her. Framed from mid-thigh up, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
