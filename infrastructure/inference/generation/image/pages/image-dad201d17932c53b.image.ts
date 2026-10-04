import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDad201d17932c53b = {
  id: "01a1071c-e085-7e8a-9975-ea2ba68411a9",
  type: "page-type/image",
  slug: "image-dad201d17932c53b",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment inside the silver ring in the middle of the marble floor. The pink-haired woman from the second image stands alone in the centre of the silver circle, feet together, her gloved hands clasped tight at her chest, her chin lifted slightly toward the dome and her eyes shut, lips moving in a small silent plea, hopeful and frightened at once. Bright light pours straight down on her from the glass dome, and fine dust turns in the shaft of light around her. Along the curved walls, the young people and mothers on the benches sit very quiet, watching, soft and out of focus, and a grey-robed priestess with a paper roll stands at the circle's edge. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright pale light from the dome, the hall around her dimmer. Full-length shot from the edge of the circle at eye level, 50mm lens.",
} as const satisfies Image
