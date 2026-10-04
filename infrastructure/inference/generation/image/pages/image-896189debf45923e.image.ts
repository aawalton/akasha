import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image896189debf45923e = {
  id: "01a10716-d562-7d60-bb29-bef75c10e5d3",
  type: "page-type/image",
  slug: "image-896189debf45923e",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, the canal city on the lake, and put this moment on the lakeshore road along the low stone wall where the canal opens onto the Mere. The pink-haired woman from the second image walks briskly along the road beside the wall, mid-stride, licking honey off the fingertips of her right hand, the crumpled paper twist of a finished bun in her left. She looks ahead along the road, eager and nervous, a small determined smile. Small wooden boats are moored against the wall beside her, bumping gently. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with small pouches, fingerless brown leather gloves, tall brown leather boots, a small worn leather satchel on a strap across her chest, and a small pink-and-white flower clip above her left ear in her rose-pink hair; fine beads of mist sit on her bare shoulders. Half past seven in the morning: the lake lies misted white from shore to shore, the far side gone, and soft white mist drifts over the wall onto the road; the paper lanterns along the canal hang unlit, and the light is cool, pale and diffuse. Full-length shot from the road ahead and to one side, 35mm lens.",
} as const satisfies Image
