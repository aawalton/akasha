import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image63569245f62c6cd3 = {
  id: "01a106ce-6d1a-7f80-8435-2e5c1da666ab",
  type: "page-type/image",
  slug: "image-63569245f62c6cd3",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the guild hall of the first image, keeping its dark timber and warm wood look: its wide worn stone front steps in the late afternoon sun, a busy cobbled square below with carts and pigeons. Keep both women's faces exactly as in their images. The pink-haired woman from the second image sits on a warm stone step, laughing happily with her head tipped back and her hands around her knees. Sprawled across two steps beside her, the copper-haired woman from the third image leans back on one elbow, gesturing with her free hand mid-argument, grinning, a great axe propped beside her like a friend. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. The third image's woman: a gorgeous slim young Korean woman of twenty-one, East Asian features, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, neat cloth knuckle wraps. Only these two women up close. Long golden late-afternoon sunlight. Medium shot from a step below, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
