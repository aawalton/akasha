import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image19c82cd363e82088 = {
  id: "01a10652-15fe-7db3-b36f-97023429c15a",
  type: "page-type/image",
  slug: "image-19c82cd363e82088",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at the plain door in its far wall, painted charcoal grey, beside the long quest board of pinned paper notices. The guildmaster, a grey-haired broad-shouldered East Asian woman in her fifties with a scar through one eyebrow, in a plain dark jerkin, stands with her hand flat on the charcoal door and looks down at the pink-haired woman from the second image, who stands beside her gripping the strap of her satchel, looking up at the door with nervous curiosity. A few adventurers in the background give the door a wide berth. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Warm afternoon light slanting from high windows. Medium shot, 35mm lens, both faces clear, nothing lettered.",
} as const satisfies Image
