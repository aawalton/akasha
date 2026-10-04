import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6884fea5921c4aa = {
  id: "01a106b9-bb34-711d-815e-f85bd26af6d9",
  type: "page-type/image",
  slug: "image-c6884fea5921c4aa",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates, both women sitting on the dusty floor against the wall. Close on hands: the pink-haired woman from the second image has taken the redhead's right hand into her lap and is unwinding a loose dirty strip of cloth from her knuckles, shaking it out, concentrating, eyes down on the hand, lips pursed in care, like a healer dressing a sprain. The redhead from the third image lets her, startled, looking down at her own hand in the pink-haired woman's lap, a great axe across her knees. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. The redhead: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots. Dim warm light. Medium close shot from slightly above, 50mm lens, both faces and the hands clear.",
} as const satisfies Image
