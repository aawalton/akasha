import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7514d2b79c195100 = {
  id: "01a10736-0956-7cb0-8fc1-6f4153caa1a5",
  type: "page-type/image",
  slug: "image-7514d2b79c195100",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, and put this moment at the long registration desk near the foot of the wide wooden staircase. Behind the desk, a thin young man with ink-stained cuffs has left his stool and is hurrying away up the staircase two steps at a time, his back to the desk; his pen rests upright in its stand beside an open ledger with a small bead of ink on the page. The pink-haired woman from the second image stands alone at the front of the desk, her gloved hands still resting on its edge, her head turned to watch him go up the stairs, her lips slightly parted, puzzled and a little forlorn. Behind her the line of waiting adventurers shuffles and looks elsewhere. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Late morning, warm golden light from the high windows slanting through dusty air. Medium-wide shot from beside the desk, the staircase behind, 35mm lens.",
} as const satisfies Image
