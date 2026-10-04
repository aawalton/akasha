import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4fba877fd8840adb = {
  id: "01a10727-b9ba-7444-a141-63461e611bb1",
  type: "page-type/image",
  slug: "image-4fba877fd8840adb",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and keep the small ornate framed mirror hanging awkwardly on the sloped wall above the narrow bed with the patchwork quilt. The pink-haired woman from the second image kneels on the bed, leaning in toward that small framed mirror to check herself in it, her face close to the glass, her right hand raised to her hair pressing a small pink-and-white flower clip in above her left ear, her left hand smoothing the front of her top flat against her middle. She studies her reflection with a small shy pleased smile, lips just parted as if speaking to herself. She is alone. She is newly dressed in a cropped cream halter top laced up the front with a neat bow, a strip of pale skin at her middle, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves and tall brown leather boots. The empty stool stands beside the bed. Soft grey-gold early light from the round window, ten to six in the morning, lights one side of her face and the room is still dim. Medium shot from beside the bed, slightly behind her shoulder, her face small in the mirror, 50mm lens.",
} as const satisfies Image
