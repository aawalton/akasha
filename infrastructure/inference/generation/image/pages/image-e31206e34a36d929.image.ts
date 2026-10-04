import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE31206e34a36d929 = {
  id: "01a10645-500f-79e7-aa59-c82c7c16bc55",
  type: "page-type/image",
  slug: "image-e31206e34a36d929",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates, on dusty floorboards against the wall. The woman from the second image and the woman from the third image sit side by side on the floor, backs to the wall, turned toward each other in three-quarter view. The pink-haired woman from the second image holds the redhead's right hand in her lap with both hands and bends over it, winding a strip of cloth neatly around her knuckles, eyes down on the wrap, a small gentle smile. The redhead from the third image sits perfectly still, head turned to stare at her from very close, lips parted, her cheeks and the tips of her ears flushed bright red, a great axe lying across her knees. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. The third image's woman: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots. Dim warm afternoon light slanting from high windows. Medium shot from slightly above, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
