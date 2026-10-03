import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereViiNala = {
  id: "01a0ea1b-2e97-7f87-b23a-7f9f79c609b5",
  type: "page-type/character-player",
  slug: "otherwhere-vii-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  coverDescription:
    "a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part",
  story: "story-played/otherwhere-vii",
  place: "place/otherwhere-vii-ashford",
  person: "person/alan",
} as const satisfies CharacterPlayer
