import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image197f525a30d75bf4 = {
  id: "01a1074c-24dc-7b4a-8905-d2c9b427cf08",
  type: "page-type/image",
  slug: "image-197f525a30d75bf4",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the near edge of the great green pool beside the bronze lion-head spout. The bearded man from the second image sits up on the warm wet marble at the pool's lip, knees drawn up, one hand pressed to his forehead, brow furrowed, staring down at the wet stone in front of him as he tries and fails to remember how he came here. He wears only a white linen bath sheet wrapped around his waist, damp at the hem, bare chest, shoulders and arms beaded with water; his face, brown eyes, short dark buzzed hair and dark beard exactly as in the second image. Nothing else of his is anywhere: no clothes, no shoes. Soft gold light falls from the oculus far above, steam drifting off the water, a thin skin of water shining on the marble around him. Medium shot from a little above and to one side, 50mm lens, the bathhouse softly behind him.",
} as const satisfies Image
