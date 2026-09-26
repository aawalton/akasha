import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB68837166f89d1e2 = {
  id: "019f22cf-a506-754f-a749-a74d4bf902e6",
  type: "page-type/image",
  slug: "image-b68837166f89d1e2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 cinematic night scene: a beautiful Norse watcher woman positioned almost entirely on the RIGHT side of the frame, right third, framed close from the waist up, large in frame, her body angled but her luminous prismatic eyes making direct eye contact with the viewer. She stands at the rail of a wooden bridge edged with low flames. The LEFT half of the frame is calm negative space: the fire-lit wooden bridge recedes far into the dark distance over black water, shrinking toward a faint distant glow, under a deep night sky with green aurora curtains. Long white-gold hair, pale luminous skin, white and silver gown with gold trim. Dramatic but calm firelight from below, aurora light from above. Photographic, sharp, cinematic.",
  seed: 401,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
