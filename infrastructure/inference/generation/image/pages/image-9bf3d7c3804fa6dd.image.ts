import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9bf3d7c3804fa6dd = {
  id: "01a0c5f3-b3c8-718c-8726-ef783164e541",
  type: "page-type/image",
  slug: "image-9bf3d7c3804fa6dd",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her late twenties, sharp and intelligent and contemporary, dark hair twisted up into a messy practical bun with a pen stuck through it and loose strands falling, fine reading glasses pushed up onto her head, wearing a comfortable worn old button-up shirt with the sleeves rolled to the elbow, a small smudge of ink on the side of her hand, unfussy and real; sharp wry incisive expression, a dry knowing half-smirk with one eyebrow faintly raised, quick clever appraising eyes, warmth living under the bite, amused; in a cluttered lived-in writing room, leaning stacks of manuscripts and books, a typewriter and a coffee mug, warm desk-lamp light, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 7002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
