import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image41fb786aef4aecaa = {
  id: "01a10717-c30b-70e3-9cb4-6abcd996bfa9",
  type: "page-type/image",
  slug: "image-41fb786aef4aecaa",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the white stone and the glass dome of the hall in the first image, but this moment is outside it, on the broad white stone steps below its tall closed arched doors, above the misty lake. A long line of nervous young people of twenty in their best clothes waits up the steps, quiet and stiff, some with parents at their elbows. The pink-haired woman from the second image stands at the very end of the line, two steps below the girl ahead of her, gripping the strap of her satchel in both fists at her chest, her shoulders up, looking up the steps at the closed doors, anxious and hopeful, lips pressed together. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear in her rose-pink hair. Eight in the morning, white mist off the lake drifting around the steps, the dome catching a little pale light through it, soft cool diffuse light. Medium-wide shot from lower on the steps behind her and to one side, 35mm lens.",
} as const satisfies Image
