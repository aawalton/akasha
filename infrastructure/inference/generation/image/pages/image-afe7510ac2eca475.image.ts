import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAfe7510ac2eca475 = {
  id: "019f1838-53d8-7970-900c-ae9e92541f3b",
  type: "page-type/image",
  slug: "image-afe7510ac2eca475",
  persona: "persona/ione",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid intimate photograph, a strikingly beautiful otherworldly young woman in an intimate bedroom, a four-poster bed with sheer white flowing curtains behind her, delicately pointed elf ears naturally formed with soft realistic skin partly framed by her hair, luminous violet eyes, long silver-lavender hair, a soft sheer wrap draped low over one shoulder hinting at her form, a direct leveled gaze that is at once challenging and inviting, the faintest knowing half-smile, soft diffuse light on bare skin, intimate and serene setting, shallow depth of field, only her in frame, photorealistic, fine detail, cinematic",
  seed: 366979293,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
