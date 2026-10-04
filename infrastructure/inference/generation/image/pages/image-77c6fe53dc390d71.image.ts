import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image77c6fe53dc390d71 = {
  id: "01a1074f-c0ee-7c32-aeb4-fcac7d44f43e",
  type: "page-type/image",
  slug: "image-77c6fe53dc390d71",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge. The dark-haired woman from the second image lies on her side on the warm marble, just stirring awake: eyes still closed, brow creasing, one hand curling against the stone, her dark brown salt-tousled waves spread damp around her head. An arm's length from her, the bearded man from the third image props himself up on one elbow on the marble and watches her, wary and still. She is wrapped in a white linen bath sheet from her armpits to her thighs, the same as his; her olive skin, nose freckles and face as in the second image. He wears a white linen bath sheet around his waist, bare chest; his face, short dark buzzed hair and dark beard as in the third image. Soft gold light from the oculus, steam drifting off the green water just beyond them, a thin skin of water on the marble. Low shot at stone level, 35mm lens, the woman in the foreground and the man a little behind her.",
} as const satisfies Image
