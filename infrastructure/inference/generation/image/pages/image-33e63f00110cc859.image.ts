import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33e63f00110cc859 = {
  id: "019f1839-4e90-7bf2-b811-1543cd877eda",
  type: "page-type/image",
  slug: "image-33e63f00110cc859",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide 21:9 composition, photoreal. A serene young woman seated chest-up, placed entirely on the RIGHT third of the frame, body turned slightly toward camera, calm direct eye contact with the viewer, still and grounded. Deep indigo-blue cosmic background filled with faint golden stardust and distant stars; a soft inner glow on her bare shoulders and face. On the LEFT half, a tall vertical column of slowly falling luminous stardust descending from darkness, calm empty negative space around it. Dark wavy hair, ethereal and hushed mood, soft volumetric light. The left half kept calm and uncluttered for desktop icons.",
  seed: 202,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
