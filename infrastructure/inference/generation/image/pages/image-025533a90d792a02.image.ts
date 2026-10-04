import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image025533a90d792a02 = {
  id: "01a1075d-d6dc-7ca3-ad28-2425674a3321",
  type: "page-type/image",
  slug: "image-025533a90d792a02",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, walking along the marble edge of the great pool past the bronze lion-head spout, toward the far wall. The dark-haired woman from the second image strides ahead barefoot along the pool's edge, purposeful, her eyes fixed forward on the far end. The bearded man from the third image walks a step behind her, holding his sheet at his hip with one hand, glancing at the heated marble benches stacked with folded white linen and little jars along the wall beside them. The woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face in profile as in the second image. The man wears a white linen bath sheet around his waist, bare chest; face in profile, short dark buzzed hair and dark beard as in the third image. Water pours from the lion's mouth into the steaming green pool beside them, gold oculus light through steam, the tall shut doors ahead at the far end. Side tracking shot, full figures, 35mm lens.",
} as const satisfies Image
