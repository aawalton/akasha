import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b9461891ab4bbf8 = {
  id: "019f2372-0068-7624-aa5c-b0a746022c81",
  type: "page-type/image",
  slug: "image-4b9461891ab4bbf8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad whose body runs on living light, in a banyan grove at night. Beneath her warm brown skin, faint branching veins of soft green-gold light glow like sap flowing under the surface — brightest at her collarbones and the sides of her neck, fading like roots down her chest. Her dark hair is threaded with living banyan leaves and one thin braid wrapped in fine copper wire. Luminous green eyes with an amber ring, direct gaze, calm half-smile. Massive banyan trunk and hanging aerial roots behind her in deep green darkness, a few warm status-lights far back like fireflies. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
