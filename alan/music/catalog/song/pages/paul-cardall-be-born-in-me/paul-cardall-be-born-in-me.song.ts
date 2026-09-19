import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeBornInMe = {
  id: "01a0b77d-1433-73de-a39d-e3a2ffb584a8",
  type: "page-type/song",
  slug: "paul-cardall-be-born-in-me",
  title: "Be Born In Me",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
