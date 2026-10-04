import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD739883ed96fda0a = {
  id: "01a10721-7c2b-787d-ad67-88febbc867b4",
  type: "page-type/image",
  slug: "image-d739883ed96fda0a",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment inside the silver ring in the middle of the marble floor. The pink-haired woman from the second image stands in the silver circle looking up at the glowing pane of warm light floating above her, with its one looped knot-shaped glyph and no letters, reading it slowly and carefully. Her brows are drawn together in concentration, her eyes narrowed a little, her lips shaping a sound; her right gloved forefinger is raised slightly in front of her as if tracing a line, her left hand holding the strap of her satchel. She is calm, careful, a little pale. Behind her the curved wall of benches and the stone gallery are full of blurred, still, watching people. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright light from the glass dome falling on her face and the warm glow of the pane above. Waist-up shot from slightly below and to one side, 85mm lens.",
} as const satisfies Image
