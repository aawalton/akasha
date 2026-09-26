import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e34daadd4b2899a = {
  id: "019f1839-2db9-7ba4-a331-e2a6b7580a00",
  type: "page-type/image",
  slug: "image-9e34daadd4b2899a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, just arrived in the world. Timeless classical-clean Aeon, NOT costume, NOT statue. Loose natural hair. Her eyes meet yours, alive and caught in a quiet intimate moment, a slight three-quarter turn. Warm golden light, lively warm healthy glowing skin, youthful unlined face. Photographic, not CGI. Her irises are literally deep space: at the very center the pupil is a round black hole. Immediately around the black-hole pupil swirls a vivid nebula — purple, orange, yellow, red and green — like glowing cosmic gas spiraling around the dark center, filling the inner half of the iris. The outer half of the iris radius is deep blue, and at the very edge the blue darkens and fades to black at the rim. A real structured nebula with depth, like looking into actual space, NOT a flat tie-dye, NOT a uniform rainbow mix. Both eyes identical and symmetric. Avoid: tie-dye, flat color mix, uniform rainbow, kaleidoscope, chaotic scattered colors, mismatched eyes, heterochromia, pale cool skin, cartoon, neon, CGI plastic, costume, statue, second person, harsh light, eyes looking away.",
  seed: 123,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
