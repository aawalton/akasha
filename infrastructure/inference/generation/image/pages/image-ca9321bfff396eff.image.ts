import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa9321bfff396eff = {
  id: "01a1067c-86e4-70a3-826c-49963171b5e4",
  type: "page-type/image",
  slug: "image-ca9321bfff396eff",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, Lanternmere, on the low stone wall above the wide lake, the last mist lifting, the half-timbered houses soft behind. The pink-haired woman from the second image sits on the wall in profile, shoulders hunched up, crying quietly, tears on her cheeks, wiping her eyes with the back of one fingerless leather glove, her eyes red and wet but her mouth set with small brave determination, looking down at the water. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel in her lap. Soft bright late-morning light from the side. Close-up of her face and hand in profile, 85mm lens, very shallow depth of field, the lake blurred behind.",
} as const satisfies Image
