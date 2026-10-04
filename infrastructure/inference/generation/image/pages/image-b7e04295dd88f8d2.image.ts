import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB7e04295dd88f8d2 = {
  id: "01a1072a-0007-7f93-82be-e22bf6196665",
  type: "page-type/image",
  slug: "image-b7e04295dd88f8d2",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the narrow attic room under the sloped timber ceiling, and put this moment sitting on the edge of the narrow bed with the patchwork quilt. The pink-haired woman from the second image sits on the edge of the bed with a small soft worn brown leather satchel with a buckled flap open on her lap, sliding a folded letter flat into it against a small soft blue notebook, her eyes down on the satchel, lips moving as if naming each thing, calm and careful. A small round tin of salve and two rolls of white linen bandage lie on the quilt beside her, waiting to go in. She is alone. She wears a cropped cream halter top laced up the front with a neat bow, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, and a small pink-and-white flower clip above her left ear in her short rose-pink bob. Soft grey-gold early light from the round window, a little before six in the morning, the room still dim. Medium shot from the front and a little to one side at seated height, 35mm lens.",
} as const satisfies Image
