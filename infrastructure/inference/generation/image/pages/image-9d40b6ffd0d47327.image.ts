import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9d40b6ffd0d47327 = {
  id: "01a0f98d-b968-7cd0-a59b-ee097ff92109",
  type: "page-type/image",
  slug: "image-9d40b6ffd0d47327",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-4c6b34f00de1d8e9",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She has smooth pale golden skin, dark brown eyes, straight fine black brows, a delicate oval face, a full mouth with deep red lips, and glossy black hair cut in a chin-length bob with a blunt fringe straight across her brow. She is slender and willowy with long slender bare arms. She wears a dark red silk halter gown tied behind her neck, leaving her shoulders and back bare, the silk falling loose to the floor, with nothing at all beneath it, and over her eyes a half-mask of gold filigree, fine as lace. She stands alone at the edge of the ballroom just in front of a dark stone stair arch, facing the viewer, her left arm at her side, and lifts two fingers of her right hand to the outer edge of the gold mask at her temple, pressing and testing it precisely. Her face is composed and cool, mouth closed and level, her dark eyes behind the mask looking past the viewer toward the far end of the room. Behind her, mirrored walls framed in gold, red velvet, and crystal chandeliers burning with real candles, warm candlelight at night. Framed from head to waist, 85mm lens, shallow depth of field, the ballroom softly blurred into golden bokeh, fine skin texture, deep reds and warm golds.",
} as const satisfies Image
