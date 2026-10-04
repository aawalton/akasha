import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8d8f543855c202f = {
  id: "01a1071f-7199-7492-a18e-4476929b9ed9",
  type: "page-type/image",
  slug: "image-e8d8f543855c202f",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the white domed hall, and put this moment at the silver circle, seen from behind the benches along the curved wall. In the middle distance the pink-haired woman from the second image stands very still alone in the silver ring under the shaft of light from the dome, small and straight-backed, her gloved hands at her sides, her face pale and quiet, looking out at the hall. A glowing pane of warm light with one looped knot-shaped glyph and no letters still hangs in the air over her head. In the foreground, the backs and turned heads of the people on the benches: mothers frozen with hands in their laps, young people staring, one young dark-haired woman with a wet face turned up, and near the circle a grey-robed priestess with her paper roll half-lowered and her mouth open. Every face is turned toward the circle; nobody moves. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Ten in the morning, bright pale dome light on the circle, the benches in shade. Wide shot from behind the benches, 35mm lens.",
} as const satisfies Image
