import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f9d6305943d20ee = {
  id: "01a1073a-0d52-714d-9cbf-f47aba67d9f8",
  type: "page-type/image",
  slug: "image-3f9d6305943d20ee",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the dark oak timber and warm wood of the first image, but this moment is in the guildmaster's office upstairs: a room with a tall window over a sunny square, a long table with maps pinned flat under glass, and a rack of practice swords in the corner with their grips worn dark. A grey-haired woman in her fifties, broad-shouldered, in a plain dark leather doublet, a thin scar through one eyebrow, sits at the table reading aloud from a single printed sheet laid flat before her, one forefinger moving down the lines, her face serious and even. Across the table from her sits the pink-haired woman from the second image, upright on a wooden chair, her gloved hands folded in her lap, listening intently with her eyes on the sheet, her lips closed, solemn and attentive. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Noon, bright daylight from the window falling across the table and the glass over the maps. Medium two-shot from the end of the table, 35mm lens.",
} as const satisfies Image
