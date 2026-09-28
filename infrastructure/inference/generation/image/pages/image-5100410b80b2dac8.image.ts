import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5100410b80b2dac8 = {
  id: "01a0e983-13a5-7586-8603-77524fc651c4",
  type: "page-type/image",
  slug: "image-5100410b80b2dac8",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ec69b5a855800bb8",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She has fallen asleep on her back on a woven straw beach mat in a park, cat-eye sunglasses pushed up onto her forehead, mouth slightly open in a peaceful nap. An open hardback book lies face-down across her chest, covering it, one hand still resting on it. She wears a retro high-waisted polka-dot bikini bottom and a silk headscarf tied in her hair; a half-eaten peach sits beside her. Camera from above at a three-quarter angle, hazy warm midday light, dappled leaf shadows at the edge of the mat. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
