import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b8c7290e7eb5bba = {
  id: "01a10749-3b9b-7729-97bc-599f17018f66",
  type: "page-type/image",
  slug: "image-6b8c7290e7eb5bba",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-546f4c8a36b1f205",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a pretty, slim young Korean woman of nineteen with a K-pop idol's sweet face: a small V-line face, almond-shaped bright green eyes, a small nose, a wide friendly smile, warm sun-kissed golden skin dusted with freckles, and shoulder-length copper-red curls tied up messily with a strip of blue cloth, with a slim build and small chest. She wears a faded blue work shirt with the sleeves rolled, a brown canvas waistcoat, canvas trousers, a red kerchief knotted at her throat and worn boots, a coil of rope over her shoulder. She leaps lightly off the gunwale of a long bottle-green coal barge onto a black stone quay, mid-jump, light as a cat, the rope paying out behind her, whistling, her eyes on a bollard below. Pots of red and pink geraniums line the barge's cabin roof behind her; coal heaps and other moored barges blur along the wharf. Bright early summer morning sun. Nothing lettered. Medium full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
