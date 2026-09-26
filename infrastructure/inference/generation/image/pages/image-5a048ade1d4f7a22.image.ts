import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5a048ade1d4f7a22 = {
  id: "019f1839-339f-7ca2-8d7e-2d4ba9b5b05e",
  type: "page-type/image",
  slug: "image-5a048ade1d4f7a22",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, just arrived in the world. Timeless classical-clean Aeon, NOT costume, NOT statue. Loose natural hair. Her eyes meet yours, alive and caught in a quiet intimate moment, a slight three-quarter turn. Warm golden light, lively warm healthy glowing skin, youthful unlined face. Photographic, not CGI. Her irises are literally deep space: at the very center the pupil is a round black hole. Immediately around the black-hole pupil swirls a vivid nebula — purple, orange, yellow, red and green — like glowing cosmic gas spiraling around the dark center, filling the inner half of the iris. The outer half of the iris radius is deep blue, and at the very edge the blue darkens and fades to black at the rim. A real structured nebula with depth, like looking into actual space, NOT a flat tie-dye, NOT a uniform rainbow mix. Both eyes identical and symmetric. Avoid: tie-dye, flat color mix, uniform rainbow, kaleidoscope, chaotic scattered colors, mismatched eyes, heterochromia, pale cool skin, cartoon, neon, CGI plastic, costume, statue, second person, harsh light, eyes looking away.",
  seed: 125,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
