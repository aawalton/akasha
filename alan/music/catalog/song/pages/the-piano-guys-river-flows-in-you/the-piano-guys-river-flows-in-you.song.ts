import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRiverFlowsInYou = {
  id: "01a0b780-6f12-713f-bbb8-36523b445c19",
  type: "page-type/song",
  slug: "the-piano-guys-river-flows-in-you",
  title: "River Flows In You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
