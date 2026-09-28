import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDa5950352998c9b3 = {
  id: "01a0e99c-f20d-70e7-82a6-523220e02e2d",
  type: "page-type/image",
  slug: "image-da5950352998c9b3",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman, same face and hair. A still from a lavish fantasy film, dawn on an alien shore. She lies half-waking on her back in fine black sand at the waterline, propped on one elbow, a wave's foam sliding up around her, her long dark red hair fanned out wet across the sand. Oversized grey t-shirt damp and slipping off one shoulder, black shorts over black tights, bare feet. Low golden sun just above the sea behind her, glowing through the thin curl of each wave, which turns faintly rose and green. Gulls silhouetted. Warm golden rim light on her hair and face, cool blue shadow, mist over the water, low camera at sand level, shallow depth of field.",
} as const satisfies Image
