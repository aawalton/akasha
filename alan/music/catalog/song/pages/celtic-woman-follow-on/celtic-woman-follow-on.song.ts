import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanFollowOn = {
  id: "01a0b771-6229-7659-afe0-4be27b35701a",
  type: "page-type/song",
  slug: "celtic-woman-follow-on",
  title: "Follow On",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
