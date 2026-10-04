import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF726a9eda17b1573 = {
  id: "01a10714-edae-7390-a040-c6ce3b23b40b",
  type: "page-type/image",
  slug: "image-f726a9eda17b1573",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, and put this moment on the edge of the narrow bed. The pink-haired woman from the second image sits on the edge of the made bed with a small worn brown leather satchel open on her lap. Her left hand holds the flap up; her right hand slides a folded letter in flat against a small blue notebook inside it. Beside her on the quilt lie a small tin of salve and two rolled bandages waiting to go in. She looks down into the satchel, murmuring to herself, her face calm and careful, lips moving. She is alone. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, and a small pink-and-white flower clip above her left ear in her rose-pink hair. Soft early morning light from the round window, just before six, falls across her lap and the satchel, warm flour haze in the air from the bakery below. Medium shot from the front and slightly above, 35mm lens.",
} as const satisfies Image
