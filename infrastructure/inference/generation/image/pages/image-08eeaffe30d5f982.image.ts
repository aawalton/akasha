import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image08eeaffe30d5f982 = {
  id: "01a10695-c72b-7905-9b7b-b1650dfe715f",
  type: "page-type/image",
  slug: "image-08eeaffe30d5f982",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-d34454b4584b976c", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates, on dusty floorboards against the wall. The copper-haired woman from the second image, with her exact face from the second image, sits on the floor with her back to the wall, holding up her freshly wrapped hands and talking with a gruff, embarrassed sideways glance at the pink-haired woman from the third image, who sits close beside her on the floor listening with her chin tipped and a soft smile, a satchel in her lap. A great axe lies across the redhead's knees. The second image's woman: a gorgeous slim young Korean woman of twenty-one with a K-pop idol's pretty face, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest, slender arms; sleeveless battered leather jerkin, dark trousers, scuffed boots, neat cloth knuckle wraps. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Warm late afternoon light slanting from high windows. Medium shot at their eye level, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
