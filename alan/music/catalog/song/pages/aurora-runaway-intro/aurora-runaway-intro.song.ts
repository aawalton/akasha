import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRunawayIntro = {
  id: "01a0b770-cb99-7174-a07d-b9915764c1e5",
  type: "page-type/song",
  slug: "aurora-runaway-intro",
  title: "Runaway Intro",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
