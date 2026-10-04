import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC4769965fbec03e8 = {
  id: "01a10713-1292-7c67-9148-ca453f1895dc",
  type: "page-type/image",
  slug: "image-c4769965fbec03e8",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, and put this moment at the little rocking wooden table. The pink-haired woman from the second image sits on the three-legged stool at the table writing a letter. A small glass inkpot is held still between her knees; her right hand holds a dip pen just above a sheet of paper on the table, her left hand flat on the paper to keep it from sliding. She looks down at the page with her brows drawn together, thoughtful and a little wistful, lips pressed softly together, as if deciding the next line. She is alone. She wears a plain white linen shift with thin straps that falls to her knees, bare arms, bare feet tucked under the stool, her rose-pink hair loose, no clip. Behind her the narrow bed with its patchwork quilt is rumpled. Pale grey dawn light from the round window falls across the table and the paper, half past five in the morning, and the corners of the room are dim. Medium shot from the side of the table at seated eye height, 50mm lens.",
} as const satisfies Image
