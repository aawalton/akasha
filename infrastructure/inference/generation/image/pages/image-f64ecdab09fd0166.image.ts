import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF64ecdab09fd0166 = {
  id: "01a1074d-d316-7535-a630-1441c7787745",
  type: "page-type/image",
  slug: "image-f64ecdab09fd0166",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image exactly, empty of people, looking up from the water's surface toward the oculus. Steam lifts thickly off the great warm pool and drifts upward in slow curling ribbons through the shaft of white light falling from the oculus, turning gold as it rises. The air is heavy and wet: droplets bead on the veined marble walls and on the rim of the pool, and the water's surface is still and glassy, faintly rippled where the bronze lion-head spout pours in. The dome climbs high and pale above, white marble veined with green running up its curve toward the bright opening. Warm gold light in the steam, cool green shadows in the marble, nobody anywhere in the room. Wide low-angle shot from just above the water, 20mm lens, deep depth of field, soft haze.",
} as const satisfies Image
