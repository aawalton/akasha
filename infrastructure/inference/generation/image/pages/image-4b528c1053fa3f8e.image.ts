import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b528c1053fa3f8e = {
  id: "01a10718-b89a-7f9f-b0ca-ae500ca258f4",
  type: "page-type/image",
  slug: "image-4b528c1053fa3f8e",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the white stone of the hall in the first image, but this moment is outside it, on the broad white steps below its tall closed doors, in the waiting line. The pink-haired woman from the second image stands one step below a trembling young woman with dark hair in a plain blue dress, and reaches up to her: her left hand touches the girl's elbow gently, her right hand holds out a single small green mint leaf between finger and thumb, a little sprig of mint in her palm. She looks up at the girl with a warm, coaxing smile. The dark-haired girl, shoulders hunched and hands shaking, has turned her head from the doors to look down at the leaf, wide-eyed. They stand close, an arm's length apart. The pink-haired woman wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear. Just after eight in the morning, soft white lake mist around the steps, pale cool diffuse light, other young people in the line blurred behind. Medium shot from the side at step height, 50mm lens.",
} as const satisfies Image
