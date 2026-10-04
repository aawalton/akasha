import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image319040e819554a0d = {
  id: "01a10746-c732-7737-8871-ac2dc5996215",
  type: "page-type/image",
  slug: "image-319040e819554a0d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d34454b4584b976c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest; but today her copper curls are wet, dark and combed flat to her head and tied back in a tight damp tail at the nape, not one curl loose. She wears a clean faded green linen shirt with the sleeves rolled to the elbow, dark trousers and scuffed boots, no jerkin. She stands on the front step of a bakery on a canal-side street, stiff and awkward, one hand raised to touch her flattened hair as if it hurt, her ears going red, eyes lowered to the cobbles, shifting her feet. Behind her the canal and old stone houses in low early morning sun. Nothing lettered. Medium full shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
