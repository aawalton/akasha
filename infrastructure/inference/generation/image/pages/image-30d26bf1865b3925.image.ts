import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30d26bf1865b3925 = {
  id: "01a111db-db93-7cf2-8b9a-f5930a0cfc9f",
  type: "page-type/image",
  slug: "image-30d26bf1865b3925",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b32ae69eea8b9478",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Change the light and time around it. Fantasy photorealistic, candid photograph, with nobody in the frame. Bellmoor barrow on the open downs at the middle of a summer morning: a long green grassed burial mound, longer than a great hall, smooth and round-backed, lying along the bottom of a long shallow fold in the rolling downs like something asleep. The whole mound is blue with harebells, thousands of tiny pale blue bells on fine stems nodding in the wind. Around it in a wide ring stand tall grey standing stones, taller than a person, leaning a little this way and that like old teeth, with yellow lichen on their weather sides. A wide band of long uncut grass surrounds the ring, and far off down the fold a flock of sheep grazes on close-cropped turf, keeping well away. A pale dirt road dips into the fold in the foreground. Bright clear mid-morning sun, big blue sky with a few white clouds. Nothing lettered. Eye-level view from the road at the lip of the fold, looking down along the mound and the ring of stones, 35mm lens, deep focus.",
} as const satisfies Image
