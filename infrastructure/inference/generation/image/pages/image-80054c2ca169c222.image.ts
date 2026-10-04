import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80054c2ca169c222 = {
  id: "01a106be-8cfc-7b5a-b157-667da42c3825",
  type: "page-type/image",
  slug: "image-80054c2ca169c222",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic. Keep the place from the first image: this moment is on a steep slate roof above Tanner's Row. The woman from the second image, a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, wearing a sleeveless battered brown leather jerkin, cloth knuckle wraps, dark trousers and scuffed boots, one forearm bandaged white from wrist to elbow. She crouches on the slope with one hand held out, coaxing. Above her on the chimney a big ginger tom with a white bib and a torn ear arches his back and spits, ears flat, fur on end. Late summer morning, bright sun high on the roofs, warm shade below. Exactly one woman in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
