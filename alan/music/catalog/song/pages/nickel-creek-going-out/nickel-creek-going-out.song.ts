import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekGoingOut = {
  id: "01a0caa8-a747-7598-af1b-42b0d3dd3718",
  type: "page-type/song",
  slug: "nickel-creek-going-out",
  title: "Going Out…",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
