import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterLieForLove = {
  id: "01a0b723-c59d-7184-8ba5-6faefcf11f7e",
  type: "page-type/song",
  slug: "sabrina-carpenter-lie-for-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d636488-74d3-4b8b-944d-95657262bdec",
      externalLink: "https://musicbrainz.org/work/5d636488-74d3-4b8b-944d-95657262bdec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lie for Love",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:30.013Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
