import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereXNala = {
  id: "01a0ea5f-8523-7902-b214-a47465f612c0",
  type: "page-type/character-player",
  slug: "otherwhere-x-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  coverDescription:
    "a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part",
  story: "story-played/otherwhere-x",
  place: "place/otherwhere-x-the-sheaf",
  person: "person/alan",
} as const satisfies CharacterPlayer
