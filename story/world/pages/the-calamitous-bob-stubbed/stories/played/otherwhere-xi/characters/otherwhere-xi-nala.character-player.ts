import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereXiNala = {
  id: "01a0ea62-dbb0-70ce-b50b-9c7bb11d74cf",
  type: "page-type/character-player",
  slug: "otherwhere-xi-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  coverDescription:
    "a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part",
  story: "story-played/otherwhere-xi",
  place: "place/otherwhere-xi-ashlar-farm",
  person: "person/alan",
} as const satisfies CharacterPlayer
