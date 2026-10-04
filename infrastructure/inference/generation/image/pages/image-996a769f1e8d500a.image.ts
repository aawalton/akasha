import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image996a769f1e8d500a = {
  id: "01a1073f-7f87-7b23-a4a4-d2f1f5be6062",
  type: "page-type/image",
  slug: "image-996a769f1e8d500a",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the dark oak timber and warm wood of the first image, but this moment is in the guildmaster's office upstairs, at the long table with maps under glass, a rack of practice swords in the corner and a tall window over the square. The pink-haired woman from the second image sits at the table with her gloved hands folded tightly on the tabletop, leaning forward a little, asking a question; her brows are lifted and drawn together, her eyes hopeful and anxious, her lips parted mid-word. Across the table, the grey-haired woman in her fifties, broad-shouldered, in a plain dark leather doublet, with a thin scar through one eyebrow, sits back in her chair and looks at her for a long moment, the set of her jaw softening, her expression thoughtful and almost gentle. A single signed sheet lies between them. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Just past noon, bright daylight from the window across the table. Medium two-shot from the side of the table, 50mm lens.",
} as const satisfies Image
