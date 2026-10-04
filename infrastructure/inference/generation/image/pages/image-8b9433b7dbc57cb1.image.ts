import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b9433b7dbc57cb1 = {
  id: "01a10725-9a58-76d6-9789-8d8f8f796085",
  type: "page-type/image",
  slug: "image-8b9433b7dbc57cb1",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-80f9dc44ffe50a7a",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment at the edge of the silver ring. The pink-haired woman from the second image stands in the silver circle turned toward a grey-haired priestess in plain grey robes who stands a few steps away at the circle's edge; she smiles at the priestess, a sweet, open, slightly rueful smile, her eyebrows lifted, her gloved hands loosely clasped in front of her, her head tilted a little. The priestess, a woman in her fifties with kind lines round her eyes, stares back at her with her mouth open and nothing coming out, a paper roll held stiffly in both hands. A faint glowing pane with one looped glyph and no letters still hangs above the pink-haired woman. The benches along the curved wall behind them are full of blurred silent watchers. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright pale light from the glass dome falling over both of them. Medium two-shot from the side, both in profile, 50mm lens.",
} as const satisfies Image
