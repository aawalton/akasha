import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6a7df2e791f8982c = {
  id: "019f1839-4ef7-7912-80e8-69d36ca14da7",
  type: "page-type/image",
  slug: "image-6a7df2e791f8982c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide 21:9 composition, photoreal. A serene young woman seated chest-up, placed entirely on the RIGHT third of the frame, body turned slightly toward camera, calm direct eye contact with the viewer, still and grounded. Deep indigo-blue cosmic background filled with faint golden stardust and distant stars; a soft inner glow on her bare shoulders and face. On the upper LEFT, a bright comet with a long sweeping luminous tail arcing across the dark starry sky, drawing the eye into calm empty negative space. Dark wavy hair, ethereal and hushed mood, soft volumetric light. The left half kept calm and uncluttered for desktop icons.",
  seed: 204,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
