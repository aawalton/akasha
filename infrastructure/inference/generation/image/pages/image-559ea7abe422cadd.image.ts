import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image559ea7abe422cadd = {
  id: "01a10657-18bd-7d75-930d-e93baa205eea",
  type: "page-type/image",
  slug: "image-559ea7abe422cadd",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the canal city of Lanternmere, now on the cobbled quay where the canal opens onto the wide lake, in early morning, the lanterns unlit, the lake misted white from shore to shore, small boats moored along the stone wall. The pink-haired woman from the second image walks briskly along the quay toward the camera at a slight angle, licking honey off her fingertips after a bun, a small leather satchel across her chest, looking ahead with an eager, nervous, hopeful face, mist beading on her arms. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Soft pearly white morning mist light. Full-length medium shot, 35mm lens, her face clear, the misted lake behind her.",
} as const satisfies Image
