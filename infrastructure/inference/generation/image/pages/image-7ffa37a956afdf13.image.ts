import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ffa37a956afdf13 = {
  id: "01a1129e-6273-7101-8537-763fa2b051d6",
  type: "page-type/image",
  slug: "image-7ffa37a956afdf13",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-57a6e457bf623ab7",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Change the light and time around it. Fantasy photorealistic, candid photograph, with nobody in the frame. Hobb Mill in late morning: a tall, square, grey watermill built of river stone, standing on the bank where a quick brown river runs narrow, with small deep windows high up and a wooden hoist arm jutting out under the roof. Beside it stands an enormous dark wet wooden waterwheel, taller than the mill door, with paddles all round it, standing still. The stone race channel that feeds the wheel is choked with long green river weed and round grey stones packed tight between the paddles, so the water goes past sluggish and sulky. A great weeping willow trails its long green hair into the river beside the wheel. Behind the mill, in a garden of tall bean rows, sits a low cottage with a golden thatched roof and a thin line of smoke rising from its chimney. Warm bright late-morning summer sun, blue sky, dust on a pale road in the foreground. Nothing lettered. Eye-level view from the river road at the bend, 35mm lens, deep focus.",
} as const satisfies Image
