import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDeckTheHallsBonusStudioTrack = {
  id: "01a0d52b-52d8-74ec-9dad-414106565861",
  type: "page-type/song",
  slug: "rockapella-deck-the-halls-bonus-studio-track",
  title: "Deck the Halls (Bonus Studio Track)",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
