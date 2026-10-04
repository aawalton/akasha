import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image520daf39877f1804 = {
  id: "01a1072f-e5fe-720f-a4ef-f3d531f6b1de",
  type: "page-type/image",
  slug: "image-520daf39877f1804",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the canal city on the lake, and put this moment on the low stone wall at the lake's edge. The pink-haired woman from the second image sits alone on the wall crying quietly, her shoulders drawn up, wiping her wet eyes with the back of one gloved hand, her other hand holding the satchel in her lap. Her eyes are red-rimmed and shining with tears, her lips trembling, her head bowed a little, and she looks down at the water rather than at anything. Her boots hang over the lake. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, and a small pink-and-white flower clip above her left ear in her rose-pink hair. Late morning, the mist gone, soft clear sunlight on the wide lake and the stone, the canal lanterns unlit behind her, a gull on a post in the distance. Medium close shot from beside her on the wall, three-quarter view, 85mm lens.",
} as const satisfies Image
