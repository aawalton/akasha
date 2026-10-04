import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdfe70a4ee7416d6 = {
  id: "01a10667-f66a-7f4d-90a6-79355436b095",
  type: "page-type/image",
  slug: "image-adfe70a4ee7416d6",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the timber and plaster of the first image, now a small bare room off the guild hall with a bench, a plain table and one high window. Close on the black-haired woman from the second image, standing tall, holding a black leather ledger flat against the front of her charcoal coat, her long pale fingers spread flat on its cover, her grey eyes never leaving the face of the pink-haired woman from the third image, seen over the shoulder in the near foreground, who looks down at the ledger and the long pale fingers with a small worried, sympathetic frown. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips set unsmiling, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, small leather satchel across her chest. Pale light from the high window. Over-the-shoulder medium close shot, 85mm lens, both faces readable, shallow depth of field.",
} as const satisfies Image
