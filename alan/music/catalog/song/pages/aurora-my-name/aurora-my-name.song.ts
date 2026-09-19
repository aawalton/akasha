import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMyName = {
  id: "01a0b770-effe-7b3b-9380-e2e14f60bf77",
  type: "page-type/song",
  slug: "aurora-my-name",
  title: "My Name",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
