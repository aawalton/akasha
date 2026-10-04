import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65075e52e99cda6c = {
  id: "01a1069a-55e6-74b6-972e-a12c1ddd3753",
  type: "page-type/image",
  slug: "image-65075e52e99cda6c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-fba84451f24bca40", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph seen from the side, both women in profile, neither looks at the camera. Keep the place from the first image, the timber guild hall with its rack of black chalk slates. The pink-haired woman from the third image stands in the middle of the floor facing right, head bowed, cheeks flushed, hands at her sides. One step behind her and slightly to her side stands the tall black-haired woman from the second image, her black hair in a severe low bun at the nape, facing the same way, a closed black leather ledger under her arm, chin level, her cool grey eyes fixed coldly on a group of blurred adventurers off to the right who turn their faces away. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes, straight dark brows, unsmiling, pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Warm afternoon light. Medium side shot, 50mm lens, both faces readable.",
} as const satisfies Image
