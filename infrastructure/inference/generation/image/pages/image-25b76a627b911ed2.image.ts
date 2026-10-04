import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image25b76a627b911ed2 = {
  id: "01a106dc-d75e-70b2-a11a-ed893563fd26",
  type: "page-type/image",
  slug: "image-25b76a627b911ed2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the timber guild hall of the first image to its stone front steps at nightfall, warm paper lantern light from a canal beside them. Keep both women's faces exactly as in their images. Close two-shot: the pink-haired woman from the second image sits on a step, tipping her face up to ask a gentle question, eyes soft and curious, lips just parted, lantern light on her cheek. The tall black-haired woman from the third image stands just above her, looking down at her for a long, still moment, her cool face unreadable but her grey eyes thoughtful, a closed black ledger held against her coat. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, fingerless leather gloves. The third image's woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned delicate oval face, cool grey eyes under straight dark brows, small straight nose, soft full lips in a composed unsmiling line, flawless pale porcelain skin, glossy black hair scraped smoothly back into a severe low bun at the nape; slim build, small chest; a charcoal grey guild coat buttoned to the throat with a small silver pin. Only these two women in the frame. Night blue shadows and warm amber lantern glow. Medium close-up from a low side angle, 85mm lens, both faces clear in profile and three-quarter view, shallow depth of field.",
} as const satisfies Image
