import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image248bfc99f60c69f8 = {
  id: "01a1073d-e9be-77e4-aa05-b706047ee20d",
  type: "page-type/image",
  slug: "image-248bfc99f60c69f8",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the dark oak timber and warm wood of the first image, but this moment is in the guildmaster's office upstairs, at the long table with maps pinned under glass, a tall window over the square behind. On the table lies a single printed sheet, and a grey-haired woman's broad, scarred forefinger is pressed firmly on one line of it and held there. The grey-haired woman in her fifties, broad-shouldered, in a plain dark leather doublet, leans forward over it, looking across at the girl, grave and direct. The pink-haired woman from the second image sits across from her, leaning a little forward too, looking down at the finger on the line with calm, simple attention, her gloved hands folded in her lap, her face untroubled, as if the rule were an easy one. They are close across the narrow table. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Noon, bright daylight from the window across the sheet. Medium close two-shot over the table, the hand and sheet in the foreground, 50mm lens.",
} as const satisfies Image
