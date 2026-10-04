import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6fc00610545b7982 = {
  id: "01a106b6-0d86-762e-9c2d-b203a17265d0",
  type: "page-type/image",
  slug: "image-6fc00610545b7982",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at the low end of its long quest board near the desks, the wall covered in pinned paper notices with only illegible scribbles on them. The pink-haired woman from the second image and the copper-haired woman from the third image stand shoulder to shoulder with their backs half to us, faces turned in three-quarter view toward the notices. The pink-haired woman reads slowly and earnestly, a fingertip just touching one notice, eyes wide with quiet wonder. The copper-haired woman reads with her arms folded, head tilted, weighing the notices up with a sharp, eager, crooked half-smile, a great axe slung over her shoulder. The second image's woman, with her exact face: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel. The third image's woman, with her exact face: a gorgeous slim young Korean woman of twenty-one with a K-pop idol's pretty face, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, neat cloth knuckle wraps. Only these two women in the frame. Warm mid-afternoon light from high windows. Medium shot from the side of the board, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
