import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48d03b7d8b38ae44 = {
  id: "01a106cf-a102-7a23-b0dc-8b1f29cdfc90",
  type: "page-type/image",
  slug: "image-48d03b7d8b38ae44",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the guild hall of the first image, keeping its dark timber look: its wide worn stone front steps on a cobbled square in deep golden early-evening sun. Keep both women's faces exactly as in their images. The copper-haired woman from the second image sits on a step telling a story with big gestures, one hand patting the wooden haft of a great axe standing beside her, the other flung out wide as if describing a splash, grinning hugely. Beside her on the step the pink-haired woman from the third image is helpless with laughter, doubled over, one hand gripping the edge of the stone step, eyes squeezed shut, tears of laughter on her cheeks. The second image's woman: a gorgeous slim young Korean woman of twenty-one, East Asian features, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, neat cloth knuckle wraps. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Only these two women up close. Warm golden evening light. Medium shot from a step below, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
