import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image19895da9aa989499 = {
  id: "01a10753-e90f-7926-918a-9ec5eeace9ed",
  type: "page-type/image",
  slug: "image-19895da9aa989499",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge. The dark-haired woman from the second image kneels on the marble, shoving her hair back off her face with both hands, elbows up, talking hard, her eyes fixed on the man in front of her with a challenging look, as if daring him to argue. The bearded man from the third image sits facing her a little more than an arm's length away, forearms on his knees, listening, his expression serious. She is wrapped in a white linen bath sheet from her armpits to her thighs; her olive skin, nose freckles, dark brown eyes and dark brown salt-stiff waves as in the second image. He wears a white linen bath sheet around his waist, bare chest and arms; his face, short dark buzzed hair and dark beard as in the third image. Steam drifts gold off the green pool beside them under the oculus light. Medium two-shot from the side at seated eye level, 50mm lens, the bathhouse softly behind them.",
} as const satisfies Image
