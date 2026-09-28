import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e982-da6b-7bd0-b601-346b90c70852",
  type: "page-type/character-player",
  slug: "otherwhere-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  coverDescription:
    "a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part",
  story: "story-played/otherwhere-ii",
  person: "person/alan",
} as const satisfies CharacterPlayer
