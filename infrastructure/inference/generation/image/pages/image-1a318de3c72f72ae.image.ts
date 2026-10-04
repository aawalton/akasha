import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a318de3c72f72ae = {
  id: "01a1074d-0eff-7939-a825-13de788dd81a",
  type: "page-type/image",
  slug: "image-1a318de3c72f72ae",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-129945c5ea14d2f9"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge under the high dome. The bearded man from the second image lies flat on his back on the warm wet marble at the edge of the pool, arms loose at his sides, head tipped back, gazing straight up at the dome high above him with a slack, wondering expression, water beading on his lashes and skin. He wears only a white linen bath sheet wrapped around his waist, bare chest and arms; his face, brown eyes, short dark buzzed hair and dark beard as in the second image. Above him the dome climbs high and pale, white marble veined with green, the veins running up its curve like roots toward the top, where the oculus opens onto pure white light with no sky in it. Steam lifts off the water and turns gold as it rises through the light. High angle shot looking down along his body and up into the dome behind his head, 24mm lens, deep depth of field.",
} as const satisfies Image
