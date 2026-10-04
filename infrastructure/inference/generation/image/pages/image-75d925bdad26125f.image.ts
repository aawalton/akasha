import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image75d925bdad26125f = {
  id: "01a1073d-36ad-7c06-ba8e-4bc5ae304b8b",
  type: "page-type/image",
  slug: "image-75d925bdad26125f",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8730538525d4f995",
  referenceImages: ["image/image-d34454b4584b976c", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is at the head of the coal wharf, the green barge with geraniums along its cabin roof moored down the line. The copper-haired woman from the second image holds the parcel in one hand and points with the other down the line of barges toward the bottle-green barge with geraniums. The pink-haired woman from the third image stands at her shoulder following her finger with her eyes. The copper-haired woman from the second image is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest, wearing a clean faded green shirt with the sleeves rolled to the elbow, dark trousers and scuffed boots, no jerkin; today her curls are wet and combed flat into a tight damp tail. The pink-haired woman from the third image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Bright early summer morning sun on the coal wharf, long shadows, coal heaps and moored painted barges blurred behind. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
