import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBa30abdf489a456a = {
  id: "01a1072c-f610-783e-948e-71371bb695f2",
  type: "page-type/image",
  slug: "image-ba30abdf489a456a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the canal city on the lake, and put this moment on the low stone wall at the lake's edge where the canal opens onto the Mere. The pink-haired woman from the second image sits alone on top of the wall with her boots hanging over the water and her satchel in her lap, her shoulders a little hunched; floating in the air just above her knees is a small pane of soft glowing light marked with a few faint glyphs and no letters. She looks down at it, reading it carefully and seriously, her lips pressed together, her gloved hands resting on the satchel. Out on the lake a grey gull stands on a wooden post. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, and a small pink-and-white flower clip above her left ear in her rose-pink hair. A quarter to eleven in the morning, the last thin mist lifting off the water, soft hazy sunlight, the paper lanterns along the canal unlit. Medium shot from beside her on the wall, three-quarter view, the lake behind her, 50mm lens.",
} as const satisfies Image
