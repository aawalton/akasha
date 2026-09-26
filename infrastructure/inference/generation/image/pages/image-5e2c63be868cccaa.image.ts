import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e2c63be868cccaa = {
  id: "01a0c5f3-9f6f-735a-a7da-3cee5144c955",
  type: "page-type/image",
  slug: "image-5e2c63be868cccaa",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young Japanese woman, pale skin, black eyes, long straight black hair falling wet down her back, delicate exact features, wearing nothing but poured liquid black ink that clings to her body as a dress and holds its shape by her will alone, the ink running in slow beads down her bare thighs and climbing back up again, one breast half-veiled by a rising sheet of it, bare shoulders and bare collarbone, a calm unhurried expression as though this costs her nothing, standing on flooded white paper in an empty white room, close upper-body portrait, painterly character portrait, direct eye contact with the viewer, locked-on knowing gaze, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 488587105,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
