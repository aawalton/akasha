import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFbeddd6fc34f85bf = {
  id: "01a0e97d-5388-73d7-8fb8-43465c487c4c",
  type: "page-type/image",
  slug: "image-fbeddd6fc34f85bf",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ab15122aceb34bb8",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference: she has NO horns and nothing on her head, only her own hair. She lies perfectly still on her back in the dewy grass at the misty edge of a park lawn at early morning, eyes closed, serene, her hands folded over her bare chest holding a single white lily, the lily and her hands covering her chest. A sheer black chiffon wrap is draped loosely across her hips and trails into the grass, a thin silver ring on one finger, her long hair spread around her head. Camera directly overhead, soft pale sunrise light breaking through low mist, dew glittering on the grass. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
