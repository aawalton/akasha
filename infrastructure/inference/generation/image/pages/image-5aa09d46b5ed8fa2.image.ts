import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5aa09d46b5ed8fa2 = {
  id: "01a10736-bf55-705d-be90-9a7fb7671a25",
  type: "page-type/image",
  slug: "image-5aa09d46b5ed8fa2",
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
    "Move the camera in close: a new close view of the narrow bed from the first image, the camera standing right beside the bed at mattress height, so the bed and the woman lying in it fill the whole frame and the rest of the room is out of frame. Fantasy photorealistic, candid photograph, nobody looks at the camera. The pink-haired woman from the second image has just woken far too early and lies on her back on top of the patchwork quilt, her head on the white pillow, both hands knotted together on her stomach, her eyes open and fixed on the dark beams above her, her lips closed, quietly nervous. Her short rose-pink bob is mussed from sleep and she wears no flower clip. She wears only a plain white linen shift with thin straps, knee length, her arms, shoulders, legs and feet bare. Behind her the sloped plaster wall and a dark timber beam; pale grey dawn light from the side falls across her, the room dim and cool. Close medium shot, 35mm lens, her whole body from head to bare feet along the bed.",
} as const satisfies Image
