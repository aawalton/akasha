import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16e226be5b44596d = {
  id: "01a10699-7383-710c-a346-a46fa0156cd0",
  type: "page-type/image",
  slug: "image-16e226be5b44596d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner under low grey chalk slates, on dusty floorboards against the wall. The pink-haired woman from the second image sits on the floor and looks up at the blonde woman from the third image, her face lit with a small bright delighted smile, lips parted as she says then there are three of us. The blonde woman from the third image stands over her in a scorched apron, a stick of chalk forgotten in her sooty fingers, staring down wide-eyed, mouth open in a surprised little oh, starting to smile. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel. The third image's woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde hair in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked vials. Warm late afternoon light from high windows. Medium shot from a low angle beside the seated woman, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
