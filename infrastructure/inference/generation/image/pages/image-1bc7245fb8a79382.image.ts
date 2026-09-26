import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1bc7245fb8a79382 = {
  id: "019f1838-b957-7e24-8dbe-af79e6678499",
  type: "page-type/image",
  slug: "image-1bc7245fb8a79382",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a photorealistic candid full-length action photograph of an 18-year-old human young woman, petite, a thin fine lovely face with delicate refined features, vivid bright red hair tied up in a practical but neat style with loose strands, natural soft warm blue eyes believably human and not glowing, fair skin lightly sun-warmed and faintly freckled, wearing tasteful refined makeup with softly defined eyes and a subtle warm lip, wearing a fine fitted bodice and a practical ankle-length skirt with a clean apron, caught mid-stride carrying a wooden tray across the warm busy common room of a medieval fantasy inn, absorbed in her work and not looking at the camera, a focused lively expression mid-task, warm firelit interior with motion and life around her, dynamic candid wide composition showing her whole figure in motion, cinematic, natural realistic skin texture and freckles, highly detailed photorealism",
  seed: 41550011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
