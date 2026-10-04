import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f180d82d621cb4d = {
  id: "01a10671-f9ea-7d4a-8f38-084d6eac8158",
  type: "page-type/image",
  slug: "image-8f180d82d621cb4d",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women. Keep the timber and plaster of the first image, now a small bare room off the guild hall with one high window. Close on the tall black-haired woman from the second image: her face has gone quite still with surprise, her grey eyes resting softly on the pink-haired woman from the third image, her lips just parted as she answers very quietly, as if she did not mean to let it out, a black leather ledger held against her side. The pink-haired woman stands close in front of her in three-quarter view, listening with a delighted, warm little smile. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, brown belt with pouches, fingerless leather gloves. Soft pale light from the high window on the black-haired woman's face. Medium close-up, 85mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
