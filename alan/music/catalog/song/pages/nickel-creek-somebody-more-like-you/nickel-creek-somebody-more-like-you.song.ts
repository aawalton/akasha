import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSomebodyMoreLikeYou = {
  id: "01a0caa8-addd-7e1e-aea5-17e5dd0de21e",
  type: "page-type/song",
  slug: "nickel-creek-somebody-more-like-you",
  title: "Somebody More Like You",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
