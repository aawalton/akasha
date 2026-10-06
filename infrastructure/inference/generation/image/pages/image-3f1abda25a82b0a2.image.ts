import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f1abda25a82b0a2 = {
  id: "01a1111c-39c6-760f-aad2-d49ae2de088e",
  type: "page-type/image",
  slug: "image-3f1abda25a82b0a2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d34454b4584b976c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest. She wears only a plain white linen shift of thick opaque linen, knee length, sleeveless and bare-armed, barefoot; her leather jerkin, trousers and boots lie dropped in a heap on the step beside her. She stands on the very edge of the bottom stone step, toes curled over the edge, arms swinging back, knees bent, about to dive, her copper curls blazing in the sun, her eyes fixed on the deep bottle-green water below her, mouth set in a determined grin. Behind her: broad worn stone steps going down into a great calm lake, the lowest steps green and slick with weed, old black wooden mooring posts with iron rings standing up out of the green water, the stone quay wall and a little bridge behind. Bright warm summer morning sun, the water deep cloudy green with sunlight going down into it in shafts. Nothing lettered. Full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
