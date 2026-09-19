import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysIndianaJonesAndTheArabianNights = {
  id: "01a0b780-ceec-7f7b-9286-a0d512691ab5",
  type: "page-type/song",
  slug: "the-piano-guys-indiana-jones-and-the-arabian-nights",
  title: "Indiana Jones and the Arabian Nights",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
