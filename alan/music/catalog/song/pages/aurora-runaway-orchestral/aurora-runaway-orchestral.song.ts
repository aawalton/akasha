import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRunawayOrchestral = {
  id: "01a0b770-c2f3-7f53-b31b-05e168ccf46c",
  type: "page-type/song",
  slug: "aurora-runaway-orchestral",
  title: "Runaway - Orchestral",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
