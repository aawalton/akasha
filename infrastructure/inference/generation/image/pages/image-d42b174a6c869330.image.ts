import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD42b174a6c869330 = {
  id: "01a0e968-8281-78f1-84b7-e6c0ecd068e9",
  type: "page-type/image",
  slug: "image-d42b174a6c869330",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-3162226bd194395a",
  title: "Ali Lost in a Very Large Book",
  persona: "persona/ali",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits cross-legged on a checked picnic blanket in a sunny park, wearing an oversized unbuttoned white linen shirt slipping off both shoulders and falling open, with nothing beneath it, and an enormous old leather-bound book held open against her chest, which covers her. She reads it intently with a furrowed, delighted frown, sunglasses pushed up into her hair, a stack of more books beside her. Low camera angle from the grass, slightly to the side, bright clear afternoon. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
