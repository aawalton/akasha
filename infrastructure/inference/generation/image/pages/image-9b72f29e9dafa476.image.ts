import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b72f29e9dafa476 = {
  id: "01a1072f-3ee7-7f88-8e13-51b20f18a03c",
  type: "page-type/image",
  slug: "image-9b72f29e9dafa476",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is on Thimble Canal's towpath, a canal lined with old houses and footbridges, at a flower stall under a striped awning with buckets of sweet peas, stocks and sunflowers. The pink-haired woman from the second image bends over a bucket of bright orange and gold marigolds, delighted, gathering a fat bunch of them into her arms, the stems wrapped in a twist of paper. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Early summer morning, low bright sun on the canal water, boatmen and barges blurred in the distance. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
