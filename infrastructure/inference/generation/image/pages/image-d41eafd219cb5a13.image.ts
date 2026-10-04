import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD41eafd219cb5a13 = {
  id: "01a1068e-3c37-76be-b909-624ae03e57a7",
  type: "page-type/image",
  slug: "image-d41eafd219cb5a13",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the dark old timber and leaded windows of the guild hall from the first image, upstairs in the guildmaster's small office, hand-drawn fantasy maps of an invented lake country under glass on the long table. Close on the table: a single printed sheet lies flat between them, and the broad, weathered finger of a grey-haired East Asian woman in her fifties with a scar through one eyebrow presses firmly on one line of it, her stern face leaning in at the edge of the frame. The pink-haired woman from the second image leans forward over the table, looking down at the line under the finger, calm and clear-eyed, her lips pressed in a simple, untroubled little smile, as if the rule were easy to keep. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, fingerless leather gloves, the strap of a small leather satchel across her chest. Bright noon window light across the table. Close medium shot from slightly above the table, 50mm lens, her face clear, shallow depth of field, nothing readable on the sheet.",
} as const satisfies Image
