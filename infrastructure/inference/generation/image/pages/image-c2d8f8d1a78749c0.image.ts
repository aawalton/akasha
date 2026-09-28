import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC2d8f8d1a78749c0 = {
  id: "01a0e972-b912-71ee-b11b-5b2661053a7e",
  type: "page-type/image",
  slug: "image-c2d8f8d1a78749c0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-202108e389c82e2a",
  title: "Dalla Watching the Footbridge",
  persona: "persona/dalla",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits on the grassy bank of a park pond with her bare feet dangling in the water, seen three-quarter from behind, her bare back to the camera. A loosely knitted cream wool shawl has slipped down around her waist, a silver arm ring on her upper arm, her hair in loose Norse braids. She looks out across the water toward a little arched wooden footbridge, face in partial profile, calm and far away. Camera behind her at a low angle, soft late-afternoon light glittering on the water. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
