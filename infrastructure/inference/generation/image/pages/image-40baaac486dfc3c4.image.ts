import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40baaac486dfc3c4 = {
  id: "01a106a4-39be-7647-9448-81b792d6fbfb",
  type: "page-type/image",
  slug: "image-40baaac486dfc3c4",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates, on dusty floorboards against the wall. The pink-haired woman from the second image is just sitting down on the floor beside the redhead from the third image, gathering her short skirt, her satchel in her lap, back against the same bit of wall, their shoulders nearly touching, turning to her with a friendly open smile and a little wave. The redhead sits with her legs stretched out and a great axe across her knees, a chalk slate face down beside her, glancing sideways at the pink-haired woman with wary surprise. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel. The redhead: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, loose trailing cloth wraps on her knuckles. Dim warm afternoon light. Medium shot at their eye level, 50mm lens, both faces clear.",
} as const satisfies Image
