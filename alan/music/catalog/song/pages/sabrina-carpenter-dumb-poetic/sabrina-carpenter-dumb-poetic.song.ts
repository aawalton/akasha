import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDumbPoetic = {
  id: "01a0b723-c0d7-74a0-ae11-915b4ce04c07",
  type: "page-type/song",
  slug: "sabrina-carpenter-dumb-poetic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1e4114f9-6975-4449-a487-a0052fa7d275",
      externalLink: "https://musicbrainz.org/work/1e4114f9-6975-4449-a487-a0052fa7d275",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dumb & Poetic",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
