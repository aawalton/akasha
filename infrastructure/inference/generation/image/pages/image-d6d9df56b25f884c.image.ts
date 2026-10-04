import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD6d9df56b25f884c = {
  id: "01a1072e-8d59-7e31-9d52-775457fb964e",
  type: "page-type/image",
  slug: "image-d6d9df56b25f884c",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the canal city on the lake, and put this moment on the low stone wall at the lake's edge. The pink-haired woman from the second image sits alone on the wall, boots dangling over the water, elbows on her knees and her chin propped on both gloved fists, frowning out at the lake with a rueful, wry pout, mid-word, as if telling the water something is awful. Before her, at chest height, floats a small pane of soft glowing light with two bright glyphs, one like a starburst and one like a looped cord, no letters. A few yards out on the water a grey gull standing on a wooden post has turned its head toward her. Her satchel sits on the wall beside her. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, and a small pink-and-white flower clip above her left ear in her rose-pink hair. Late morning, the mist almost gone off the lake, soft hazy sunlight on the water, the canal lanterns unlit behind her. Medium shot from the front and slightly to the side, the gull in frame, 50mm lens.",
} as const satisfies Image
