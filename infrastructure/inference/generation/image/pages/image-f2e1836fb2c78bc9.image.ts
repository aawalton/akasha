import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF2e1836fb2c78bc9 = {
  id: "01a106af-2900-75a0-aa1e-3fdc0e6856fd",
  type: "page-type/image",
  slug: "image-f2e1836fb2c78bc9",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the place from the first image, the timber guild hall, in its dim bottom corner, both women sitting side by side on the dusty floor against the wall. The redhead from the second image throws her head back and bursts out laughing, a big helpless open-mouthed laugh, eyes squeezed shut, one wrapped hand on the great axe across her knees. The pink-haired woman from the third image sits beside her with her chin tipped, nodding, looking at her with a serious, satisfied, sensible little smile. In the blurred background three adventurers at the next slate turn round to stare. The redhead: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, loose cloth wraps on her knuckles. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Dim warm light. Medium shot from the side, 50mm lens, both faces clear.",
} as const satisfies Image
