import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCdcb30febbe0a521 = {
  id: "01a0c5f3-7a99-768e-9caa-936bc37a3900",
  type: "page-type/image",
  slug: "image-cdcb30febbe0a521",
  persona: "persona/natalie",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic clean portrait of an extraordinarily, almost otherworldly beautiful young woman in her early twenties, face toward the camera. Luminous gold eyes the clear focal point — honey-gold irises, brighter gold around the pupils — meeting the viewer's gaze with delight and warm attraction. One dimple, soft inviting smile, fair flawless radiant skin, blonde hair loosely up. A cute white bunny-ears headband; a flattering apron just visible at the shoulders. Soft warm neutral background, even gentle light with a faint ethereal glow. Radiant, enchanting, approachable. Head and shoulders, very sharp focus on the eyes and face, natural skin texture, high detail.",
  seed: 779746094,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
