import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4f9858b12ab2fab2 = {
  id: "01a0e97a-e6e3-7a80-9a8d-19fd182a1925",
  type: "page-type/image",
  slug: "image-4f9858b12ab2fab2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-35b9c7980eed6d1b",
  title: "Erin Pondering Her Next Move",
  persona: "persona/erin",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her stomach on a patchwork quilt in a park with a wooden chessboard set up on the quilt in front of her, chin on one fist, frowning thoughtfully at the pieces as she considers her next move, one hand hovering over a knight. A rumpled white peasant blouse is pulled down to her waist, her back bare to the sun and her chest pressed hidden against the quilt, a leather cord bracelet on her wrist. Side profile camera at grass level, warm mid-afternoon light, a teapot and a mug beside the board. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
