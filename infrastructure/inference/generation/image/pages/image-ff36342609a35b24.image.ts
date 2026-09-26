import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf36342609a35b24 = {
  id: "01a0c5f3-9f6c-794e-b72e-2685920704fe",
  type: "page-type/image",
  slug: "image-ff36342609a35b24",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a cowboy hat and leather boots, seated on a wooden fence, arms resting on her knees, ranch sunset, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1174520425,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
