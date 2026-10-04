import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2d2cad8cea5dfb1 = {
  id: "01a106bf-5469-753c-807b-af3801b5c17e",
  type: "page-type/image",
  slug: "image-d2d2cad8cea5dfb1",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner where old grey chalk slates hang low on hooks, a faint green haze still under the rafters. The small blonde woman from the second image, the only person in the picture, stands at the slates pinning a small paper notice into the last free space, a pin held in her teeth, smoothing the paper flat with a sooty palm, then tipping her head to look at it with a doubtful, wistful, slightly wincing expression. The notice shows only faint lines of small handwriting, nothing readable. The woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair smooth skin with a smudge of soot across one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked glass vials at her waist. Warm afternoon light slanting from high windows. Medium shot in three-quarter profile, 50mm lens, her face clear.",
} as const satisfies Image
