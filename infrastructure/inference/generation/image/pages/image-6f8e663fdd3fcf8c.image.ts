import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f8e663fdd3fcf8c = {
  id: "01a1071b-8726-7693-886f-e59f75b427e7",
  type: "page-type/image",
  slug: "image-6f8e663fdd3fcf8c",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment on the benches by the curved wall, facing the silver circle. The pink-haired woman from the second image has half risen from the bench and claps hard, her gloved hands raised before her chest mid-clap, beaming, her eyes bright and wet with gladness, looking toward the circle. In the silver ring beyond, a young dark-haired woman in a plain blue dress weeps happily with both hands pressed over her face, under a glowing pane of soft green-gold light floating in the air above her, marked with one bright leaf-shaped glyph and no letters. The people on the benches around the pink-haired woman clap and smile fondly. A grey-robed priestess with a paper roll stands at the edge of the circle. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Mid-morning, pale wide light pouring from the glass dome onto the circle. Medium shot from the side of the benches, her in the near foreground and the circle beyond, 35mm lens.",
} as const satisfies Image
