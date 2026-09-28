import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2c5d7a3549e7ab8 = {
  id: "01a0e9a1-d82a-7a4f-97d3-0b9070e9fb0d",
  type: "page-type/image",
  slug: "image-d2c5d7a3549e7ab8",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d30da57708d85cb6",
  title: "Zadi Basking on the Garden Wall",
  persona: "persona/zadi",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her stomach across a low sun-warmed stone wall at the edge of a park flower garden, one arm dangling lazily toward the lavender below, cheek resting on her other forearm, eyes half-closed and content like a cat in the sun. She wears a thin saffron sarong tied as a strapless wrap that fully covers her chest and falls to mid-thigh, bare shoulders and back above it, thin silver bangles and ankle chains. Camera low from the garden side, three-quarter angle, warm mid-afternoon light, bees and lavender in the foreground blur. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
