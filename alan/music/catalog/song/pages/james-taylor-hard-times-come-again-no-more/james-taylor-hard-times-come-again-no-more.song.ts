import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHardTimesComeAgainNoMore = {
  id: "01a0b72f-2e95-7b3e-b430-59e72f604871",
  type: "page-type/song",
  slug: "james-taylor-hard-times-come-again-no-more",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5563993-5a7f-39b2-bd7d-bf00127c43ae",
      externalLink: "https://musicbrainz.org/work/c5563993-5a7f-39b2-bd7d-bf00127c43ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hard Times Come Again No More",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
