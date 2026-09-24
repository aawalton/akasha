import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleWaterUnderTheBridge = {
  id: "01a0d52b-c259-702a-9ecd-f15f6a5386a6",
  type: "page-type/song",
  slug: "adele-water-under-the-bridge",
  title: "Water Under the Bridge",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
