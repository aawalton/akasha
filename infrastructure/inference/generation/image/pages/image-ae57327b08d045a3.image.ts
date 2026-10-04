import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAe57327b08d045a3 = {
  id: "01a10738-4f72-734c-a4ea-6869fb8c76b1",
  type: "page-type/image",
  slug: "image-ae57327b08d045a3",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, and put this moment at the long registration desk by the foot of the wide staircase. A grey-haired woman in her fifties, broad in the shoulder, in a plain dark leather doublet and trousers with a sword belt, a thin scar through one eyebrow, stands squarely before the desk with a swordswoman's balanced stance, looking the younger woman over from head to boots with a long, level, measuring look. The pink-haired woman from the second image stands facing her an arm's length away, holding her satchel strap in both gloved hands, looking up at her, wide-eyed and still, trying to stand straight. Behind them the line of adventurers looks elsewhere. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten to noon, warm golden light from the high windows slanting through dusty air. Medium two-shot from the side, both in three-quarter profile, 50mm lens.",
} as const satisfies Image
