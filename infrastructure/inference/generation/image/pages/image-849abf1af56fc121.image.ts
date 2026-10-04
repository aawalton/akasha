import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image849abf1af56fc121 = {
  id: "01a1067a-eebc-772b-96ec-6382c1a9839e",
  type: "page-type/image",
  slug: "image-849abf1af56fc121",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, Lanternmere, at the low stone wall above the wide lake, mist thinning on the water, a gull on a wooden post turning its head. The pink-haired woman from the second image sits on the wall with her elbows on her knees and her chin propped on both gloved fists, frowning at two small glowing violet panes of light floating in front of her face, each marked with a single faint glyph, no words, her mouth pulled into a rueful, unimpressed little grimace as if saying something is awful. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel beside her on the wall. Soft late-morning light. Close medium shot of her face and the glowing panes from the front at a slight angle, 85mm lens, shallow depth of field, nothing lettered.",
} as const satisfies Image
