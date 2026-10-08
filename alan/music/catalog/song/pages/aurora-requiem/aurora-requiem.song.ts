import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRequiem = {
  id: "01a0b770-e413-7cfd-b950-4a50e66ede24",
  type: "page-type/song",
  slug: "aurora-requiem",
  title: "Requiem",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:44.083Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
