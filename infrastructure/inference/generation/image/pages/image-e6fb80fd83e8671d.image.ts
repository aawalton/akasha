import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6fb80fd83e8671d = {
  id: "01a106c7-9358-76a1-8e86-c28a7dd38b45",
  type: "page-type/image",
  slug: "image-e6fb80fd83e8671d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at its long registration desk with open ledgers, inkpots and a brass stamping press. Keep both women's faces exactly as in their images. The pink-haired woman from the second image and the copper-haired woman from the third image stand side by side at the desk, both leaning in to watch a thin young clerk with ink on his cuffs write in a big ledger with a dip pen. The copper-haired woman nudges the pink-haired woman with her elbow and nods at her with a crooked grin, and the pink-haired woman looks back at her, surprised and pleased, a hand at her chest. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel. The third image's woman: a gorgeous slim young Korean woman of twenty-one, East Asian features, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, neat cloth knuckle wraps, a great axe on her back. The clerk is seen from behind and the side, his face down. The ledger page shows only illegible scribbles. Late afternoon light from high windows. Medium shot over the desk, 50mm lens, both women's faces clear, shallow depth of field.",
} as const satisfies Image
