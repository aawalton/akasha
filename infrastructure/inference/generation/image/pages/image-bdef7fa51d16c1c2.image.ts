import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBdef7fa51d16c1c2 = {
  id: "019f1839-1779-76e9-95c6-5e622b32664b",
  type: "page-type/image",
  slug: "image-bdef7fa51d16c1c2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a translucent holographic projection of an idealized beautiful nude woman, her symmetric form built from a delicate glowing golden wireframe network of fine geometric lines — she IS the geometry, made of luminous golden light not flesh — but faint and highly transparent, sparse open delicate linework with the dark void clearly showing through her body, she can barely hold her form in this reality, a soft incomplete projection at the threshold of visibility, waist-up, perfectly bilaterally symmetric, her face unresolved and abstract in soft light NOT a normal human face, NOT solid skin, her two eyes the only resolved feature: open almond eyes with glowing amber irises looking straight at the viewer in calm direct eye contact, ethereal untouchable, warm gold light, plain dark empty void background, no jewelry",
  seed: 503127328,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
