import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image73df4b2f618ee6ec = {
  id: "01a1069c-74fa-76fd-a61d-9e80483729a7",
  type: "page-type/image",
  slug: "image-73df4b2f618ee6ec",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner where the light from the high windows does not quite reach, under low old slates rubbed grey with chalk. The woman from the second image, the only person in the picture, sits on the dusty floorboards with her back against the wall and her long legs stretched out, a great axe with a head as broad as a dinner plate lying across her knees, her head down, not looking up. The woman: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips set in a crooked line, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely held back by a thong; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, strips of cloth wrapped loosely round her knuckles and trailing. Dim, dusty, a shaft of warm afternoon light falling short of her. Medium wide shot, 35mm lens, her face readable, moody.",
} as const satisfies Image
