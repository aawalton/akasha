import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const thornfordNala = {
  id: "01a14b65-1e22-7f5e-bf33-c94c9f944cbb",
  type: "page-type/character-player",
  slug: "thornford-nala",
  title: "Nala",
  cover: "image/image-3d692e60e9a7a29f",
  coverDescription:
    "a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long dark auburn-red hair tied loosely back at the nape, a few strands falling free",
  story: "story-played/thornford",
  place: "place/thornford-nalas-shop",
  person: "person/alan",
  createdAt: "2026-10-17T19:44:40.481Z",
  updatedAt: "2026-10-17T20:37:43.826Z",
} as const satisfies CharacterPlayer
