import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image630d7d17a4eaa621 = {
  id: "01a1074b-15d8-7c12-94f8-a43b398eb2ef",
  type: "page-type/image",
  slug: "image-630d7d17a4eaa621",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-129945c5ea14d2f9", "image/image-b6fb75d3907f9395"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the near edge of the great green pool, beside the bronze lion-head spout. The bearded man from the second image has just woken: he lies on his side on the warm wet marble at the very lip of the pool, one hand trailing into the water, eyes half open and dazed, looking at the water. An arm's length behind him the dark-haired woman from the third image lies asleep on her side on the marble, eyes closed, face relaxed, her dark brown wavy hair spread damp on the stone. The man is wrapped in a white linen bath sheet around his waist, bare chest and arms; his face, brown eyes, short dark buzzed hair and dark beard as in the second image. The woman is wrapped in a white linen bath sheet from her armpits to her thighs; her olive skin, nose freckles and face as in the third image. Soft gold light falls from the oculus far above, steam drifting over the water, a thin skin of water shining on the marble. Low wide shot from the stone at pool level, 35mm lens.",
} as const satisfies Image
