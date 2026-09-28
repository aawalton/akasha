import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB85e053005129387 = {
  id: "01a0e99f-1a0f-7f13-8e4a-df4a51fe4ef2",
  type: "page-type/image",
  slug: "image-b85e053005129387",
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
    "Her face stays exactly as in the reference: a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part.\nKeep this exact woman, same face and hair. Epic wide establishing shot from a fantasy film. A vast, empty beach of black sand curves away into haze. She is small in the frame, sitting alone in the sand near the surf, in an oversized grey t-shirt, black shorts and black tights, barefoot, long dark red hair. Behind her a wall of alien jungle with enormous fan-shaped leaves, and beyond it a huge mountain rising out of the island's heart, a thin ribbon of black smoke streaming from its peak across a cloudless sky. Gulls overhead. Hard midday sun, heat shimmer, sweeping cinematic scale, shot on 35mm anamorphic.",
} as const satisfies Image
