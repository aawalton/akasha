import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65c32873fc436fea = {
  id: "01a0c5f2-eb26-7132-9485-8d7018903215",
  type: "page-type/image",
  slug: "image-65c32873fc436fea",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Full intimacy and trust. Late night in the closed bookshop, long after the last customer has gone, a single brass lamp throwing warm amber light down one aisle. Barefoot in stocking feet on the worn floorboards, cardigan sleeves rolled, reaching to slide a stray book back onto a high shelf, a glass of red wine set on the shelf-edge within reach. Turned half toward the room with an easy, private smile — the fully unguarded warmth of trust with no one left to be steady for, the quiet of a shared space at the end of a long day. Shot on an 85mm portrait lens, under warm low lamplight. Photorealistic with natural skin detail, 1024x1024.",
  seed: 346629654,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
