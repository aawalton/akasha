import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDf977dd3f9f327a8 = {
  id: "01a106a0-9016-75f7-85ac-2723eba3746a",
  type: "page-type/image",
  slug: "image-df977dd3f9f327a8",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, near its dim bottom corner by the low grey chalk slates. The black-haired woman from the second image stands very straight a step back from the slates, watching something just out of frame with cool, still, attentive grey eyes, her unsmiling face quiet and thoughtful, one long pale hand resting flat on the cover of a closed black leather ledger held against her side, the ledger shut. She is reading the corner of the hall like a page. The second image's woman, with her exact face: a gorgeous tall willowy young Japanese woman of twenty-four with a J-pop idol's face, fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, glossy black hair scraped smoothly back from a bare forehead into a severe low bun, not a strand loose; slim build, small chest; a charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. In the soft background, blurred, a pink-haired girl and a red-haired girl by the slates. Warm late afternoon light from high windows falling across her face. Medium close shot, 85mm lens, her face sharp, shallow depth of field.",
} as const satisfies Image
