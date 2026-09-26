import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2cb2dff9673fd1a2 = {
  id: "01a0c5f3-7a9a-7595-b22c-0ece20b82a60",
  type: "page-type/image",
  slug: "image-2cb2dff9673fd1a2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, shallow depth of field, fine realistic matte skin (her SKIN is natural and matte, not oily), ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. Close, intimate portrait, leaning at a study table near an open scroll. She gazes softly toward the viewer with quiet warmth. She is a shedah — half-angel, half-human — shown WITHOUT wings and WITHOUT any halo, bathed in soft luminous angelic dawn light. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices, soft oil-lamp light. Her eyes are her core feature: luminous silvery-dew irises, pale liquid silver-grey like a dewdrop catching first light, otherworldly and glowing. THE DEW MANIFESTS as perpetual wetness: she always looks freshly dew-touched and never quite dry. She lifts a damp lock of wet dark hair away from her face; her hair is dew-wet and glistening, her draped top dew-damp and faintly clinging, droplets catching the angelic dawn light. A soft, intimate gesture, wet with dew.",
  seed: 1968506792,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
