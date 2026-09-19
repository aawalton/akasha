import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterShadows = {
  id: "01a0b723-d2ec-798d-95d7-d0bc5c93e1d1",
  type: "page-type/song",
  slug: "sabrina-carpenter-shadows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e03d390-edbb-4abc-8b25-9b5e96b3fb4e",
      externalLink: "https://musicbrainz.org/work/3e03d390-edbb-4abc-8b25-9b5e96b3fb4e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shadows",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
