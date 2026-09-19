import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSilentNightHolyNight = {
  id: "01a0b780-2cc7-74a1-a62f-c7d51527b062",
  type: "page-type/song",
  slug: "the-piano-guys-silent-night-holy-night",
  title: "Silent Night, Holy Night",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
