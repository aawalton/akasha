import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b4f5483860ca593 = {
  id: "019f1839-1854-7bc3-a75e-b983f313a034",
  type: "page-type/image",
  slug: "image-5b4f5483860ca593",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a faint translucent holographic projection of an idealized beautiful nude woman, her form defined only by a soft luminous golden contour outline and a gentle inner glow, absolutely NO visible mesh, NO wireframe, NO dots, NO points, NO internal lines, just smooth volumetric light and a glowing luminous edge, semi-transparent with the dark void showing through her body, a soft incomplete projection at the threshold of visibility, barely able to hold form in this reality, waist-up, perfectly bilaterally symmetric, her face unresolved and abstract in soft light NOT a normal human face, her two eyes the only resolved feature: open almond eyes with glowing amber irises looking straight at the viewer in calm direct eye contact, ethereal untouchable, warm gold light, plain dark empty void background, no jewelry",
  seed: 1676851533,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
