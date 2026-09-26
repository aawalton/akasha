import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image04aa13c6b3749b1e = {
  id: "01a0c5f3-2541-7fb7-bf49-78415a752a2e",
  type: "page-type/image",
  slug: "image-04aa13c6b3749b1e",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI close-up portrait of a fae woman, head and shoulders, like a live-action movie elf, long pointed elf ears, fair pale skin with fine realistic texture and subtle freckles, large luminous glowing golden-amber eyes looking directly at the viewer, long wild emerald-green hair, soft gentle smile, dark forest bokeh, cinematic rim light, 105mm, shallow depth of field, photorealistic",
  seed: 1003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
