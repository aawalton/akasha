import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image513a9c4b4cc898fa = {
  id: "01a106f1-068f-7219-9a96-297aaf14b23c",
  type: "page-type/image",
  slug: "image-513a9c4b4cc898fa",
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
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the canal with its strings of paper lanterns, now at night: Thimble Canal, the lanterns glowing amber and rose over black water lapping at the stones, a cat watching from a lit windowsill. The pink-haired woman from the second image walks home alone along the quay under the lanterns, unhurried, head a little tilted, humming to herself with a soft absent smile, one hand resting on the satchel at her hip. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, a small leather satchel across her chest. Warm still evening, lantern light on her face, reflections in the water. Medium-wide shot from the quay ahead of her, 35mm lens, her face clear.",
} as const satisfies Image
