import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHeartsIntuition = {
  id: "01a0b770-ec63-78eb-bb0b-7f04ef22d20a",
  type: "page-type/song",
  slug: "aurora-hearts-intuition",
  title: "Hearts Intuition",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
