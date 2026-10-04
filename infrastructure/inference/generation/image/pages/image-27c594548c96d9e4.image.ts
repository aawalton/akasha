import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image27c594548c96d9e4 = {
  id: "01a1069d-5920-79d0-ace1-96a5f10a382b",
  type: "page-type/image",
  slug: "image-27c594548c96d9e4",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner where old grey chalk slates hang low on hooks. The pink-haired woman from the second image stands at an empty grey slate, reaching up with a stub of white chalk, writing carefully in big round strokes, the chalk marks only a blurred smudge, her face intent and happy. Beside her the copper-haired woman from the third image stands close holding out her hand for the chalk, a great axe resting on her shoulder, a crooked pleased grin, watching the slate. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel. The third image's woman, with her exact face: a gorgeous slim young Korean woman of twenty-one with a K-pop idol's pretty face, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, neat cloth knuckle wraps. Warm afternoon light slanting from high windows. Medium shot from the side, 50mm lens, both faces clear in three-quarter view, no readable writing, shallow depth of field.",
} as const satisfies Image
