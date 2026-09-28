import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image064b41e800304c44 = {
  id: "01a0e97e-73cc-7063-9219-aef809c2b562",
  type: "page-type/image",
  slug: "image-064b41e800304c44",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ab15122aceb34bb8",
  title: "Grace in the Morning Mist",
  persona: "persona/grace",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference: she has NO horns and nothing on her head, only her own hair. She lies perfectly still on her back in the dewy grass at the misty edge of a park lawn at early morning, eyes closed, serene, holding a single white lily in her folded hands. She wears a thin white silk slip dress whose straps have slipped off her shoulders, the silk still covering her chest fully, with a sheer black chiffon wrap draped across her hips and a thin silver ring on one finger; her long hair is spread around her head. Camera directly overhead, soft pale sunrise light breaking through low mist, dew glittering on the grass. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
