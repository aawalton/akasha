import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA42d152983f1d3e2 = {
  id: "01a10647-6154-7131-a49e-a116b649623c",
  type: "page-type/image",
  slug: "image-a42d152983f1d3e2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, now its upstairs office: a window over a sunny square, a long table with maps pinned flat under glass, a rack of practice swords in the corner. The pink-haired woman from the second image sits at the table with her hands folded in her lap, leaning forward a little, asking an earnest hopeful question, eyes wide and searching. Across the table sits the guildmaster, a grey-haired broad-shouldered East Asian woman in her fifties with a scar through one eyebrow, in a plain dark jerkin, looking back at her for a long moment, her jaw easing. A single printed sheet lies on the table between them. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Midday light from the window. Medium shot across the table from the side, 35mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
