import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image308cec105b861c6d = {
  id: "01a10750-de55-7e0e-981e-107ccf99646f",
  type: "page-type/image",
  slug: "image-308cec105b861c6d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-b6fb75d3907f9395", "image/image-129945c5ea14d2f9"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge. The dark-haired woman from the second image has just sat bolt upright on the marble, fast, one hand braced on the stone behind her, the linen sliding off one bare shoulder; she stares wide-eyed at the man beside her, mouth open mid-swear, eyebrows shot up in shock. The bearded man from the third image sits on the marble an arm's length from her, half turned toward her, one hand raised palm out, calm and startled. She is wrapped in a white linen bath sheet from her armpits to her thighs, slipping off one shoulder; her olive skin, nose freckles, dark brown eyes and dark brown salt-stiff waves as in the second image. He wears a white linen bath sheet around his waist, bare chest; his face, short dark buzzed hair and dark beard as in the third image. Soft gold light from the oculus, steam off the green water behind them. Medium shot at seated eye level from the side, 50mm lens, both figures in frame.",
} as const satisfies Image
