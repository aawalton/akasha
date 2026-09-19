import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGoldenMoments = {
  id: "01a0b72f-27b3-765c-ad9d-6b8b0951fbc1",
  type: "page-type/song",
  slug: "james-taylor-golden-moments",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7febabc7-7fb2-420a-b3a5-7d4b6b87fdba",
      externalLink: "https://musicbrainz.org/work/7febabc7-7fb2-420a-b3a5-7d4b6b87fdba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Golden Moments",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
