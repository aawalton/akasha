import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC594f93e2552ef88 = {
  id: "019f23dc-f8b3-7fca-a5a9-1c00ff89e40a",
  type: "page-type/image",
  slug: "image-c594f93e2552ef88",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a young woman blacksmith with cat ears and a cat tail — real human skin, no fur, feline ears angled forward in focus, slit-pupil amber eyes reflecting golden flame. Caught mid-rhythm at the anvil at night: hammer just lifted, tiny golden sparks drifting, her whole body in the work-trance — eyes on the glowing golden metal, lips parted in quiet concentration, almost a purr. The forge fire burns pure GOLD, lighting her from below. Dark hair tied up for work, soot on her forearms, simple cropped short top, shoulders and arms strong and alive with motion. Cinematic, intimate, photographic realism, not painterly.",
  seed: 7133,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
