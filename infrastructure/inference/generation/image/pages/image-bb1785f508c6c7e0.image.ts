import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb1785f508c6c7e0 = {
  id: "01a1073c-5248-7618-a5d1-bd661e1a8453",
  type: "page-type/image",
  slug: "image-bb1785f508c6c7e0",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the dark oak timber and warm wood of the first image, but this moment is in the guildmaster's office upstairs, with its tall window over the square, the long table with maps under glass, and the rack of practice swords. The pink-haired woman from the second image sits upright at the table, her gloved hands folded in her lap, nodding as she speaks, her face earnest and approving, a small serious smile, her eyes on the older woman across from her. Across the table a grey-haired woman in her fifties, broad-shouldered, in a plain dark leather doublet, has looked up from the printed sheet under her hand; one scarred eyebrow is raised in mild surprise, her mouth not quite smiling, studying the girl. They sit an arm's length apart across the narrow table. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Noon, bright daylight from the window across the table. Medium two-shot across the table from the side, both in profile, 50mm lens.",
} as const satisfies Image
