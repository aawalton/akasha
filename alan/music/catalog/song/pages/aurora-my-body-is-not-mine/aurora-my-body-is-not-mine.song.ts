import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMyBodyIsNotMine = {
  id: "01a0b770-eed3-78bd-a431-b9eadf4b4232",
  type: "page-type/song",
  slug: "aurora-my-body-is-not-mine",
  title: "My Body Is Not Mine",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
