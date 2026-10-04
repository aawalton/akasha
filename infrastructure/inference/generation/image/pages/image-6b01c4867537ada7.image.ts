import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b01c4867537ada7 = {
  id: "01a10677-9590-7009-bb46-66a9435f773b",
  type: "page-type/image",
  slug: "image-6b01c4867537ada7",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, Lanternmere, now at the low stone wall where the city meets the wide lake, the mist lifting off the water in late morning, a gull standing on a wooden post out in the lake, the half-timbered houses behind. The pink-haired woman from the second image sits alone on the lake wall with her boots hanging over the water and a small leather satchel in her lap, gazing down at a small glowing pane of soft violet light floating just above her knees, marked only with faint shining glyphs and lines, no words, her face serious, careful and a little lost. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Soft bright morning light through thin mist. Medium shot from the side along the wall, 50mm lens, her face and the glowing pane clear, nothing lettered.",
} as const satisfies Image
