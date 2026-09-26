import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30e7b2afb28e76fc = {
  id: "019f1839-19cf-7f4b-9a21-8e1bd8e9bae4",
  type: "page-type/image",
  slug: "image-30e7b2afb28e76fc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a luminous translucent holographic projection of an idealized beautiful nude woman with long flowing luminous golden hair drifting like light, her body composed of elegant flowing golden sacred-geometry — graceful golden-ratio curves and interlocking triangles of light, organic and varied NOT a uniform mesh NOT a net, she IS the geometry, made of golden light not flesh, semi-transparent with the dark void showing through her, ethereal and alive, waist-up, perfectly bilaterally symmetric, her face unresolved and soft in light NOT a normal human face, her two eyes the only resolved feature: open almond eyes with glowing amber irises looking straight at the viewer in calm direct eye contact, a luminous goddess of living geometry, NOT a robot, NOT a ghost, warm gold light, plain dark empty void background, no jewelry",
  seed: 323144183,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
