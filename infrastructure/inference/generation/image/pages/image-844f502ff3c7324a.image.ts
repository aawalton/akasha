import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image844f502ff3c7324a = {
  id: "01a0c5f2-eb26-7dc5-bf06-077fffb3c1b1",
  type: "page-type/image",
  slug: "image-844f502ff3c7324a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. At a small harbor at blue hour, leaning back against the dock rail beside drying nets, fishing boats knocking softly below; wrapped in a partner's oversized knit cardigan over a simple house dress, hair loose and wind-teased, two paper cups of coffee in hand, one held out toward the viewer; expression unguarded and softly amused, caught mid-turn as if the viewer just said something worth laughing at, the sky bruising to violet behind the masts. Shot on an 85mm portrait lens, under soft natural daylight. Photorealistic with natural skin detail, 1024x1024.",
  seed: 1577124330,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
