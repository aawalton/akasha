import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE577a2a9377a9a90 = {
  id: "019efbd1-d79c-7352-8d19-8f66191f1cb0",
  type: "page-type/image",
  slug: "image-e577a2a9377a9a90",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A man fights for his footing at the stone lip of a vast flooded underground cistern, dark water all around. The near surface of the black flood has risen against him at once — a churning mass of cold pale leech-like creatures swarming up his legs and waist, clinging, hauling him backward off the edge toward the deep water. He strains away toward dry stone, an iron bar in one hand, terror and effort in his body. Cold blue-black water, faint torch glow, spray and dark shapes beneath the surface, painterly cinematic fantasy illustration, muted desaturated palette, dread, dynamic motion, atmospheric horror",
  seed: 1561985437,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
