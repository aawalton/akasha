import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const emberdeepNala = {
  id: "01a0fdaf-81b9-7782-bb38-acc3af9eb636",
  type: "page-type/character-player",
  slug: "emberdeep-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  coverDescription:
    "a slim young woman of about twenty with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part",
  story: "story-written/emberdeep",
  place: "place/emberdeep-corbel-house",
  person: "person/alan",
} as const satisfies CharacterPlayer
