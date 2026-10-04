import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4a579bb86f72a48d = {
  id: "01a106bc-4c7d-7e5b-8d3d-00fade548fab",
  type: "page-type/image",
  slug: "image-4a579bb86f72a48d",
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
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner by the last of the low grey chalk slates. A puff of thick bright green smoke billows up toward the rafters, and the small blonde woman from the second image, the only person in the picture, stumbles out of the middle of it, waving both hands at the smoke, coughing, eyes squinting, embarrassed and apologetic, a popped cork in one hand. The woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair smooth skin with a smudge of soot across one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron with a scorch mark down the front, a belt of corked glass vials at her waist. Green haze lit by shafts of warm afternoon light from high windows. Medium full shot, 35mm lens, her face clear through the thinning smoke.",
} as const satisfies Image
