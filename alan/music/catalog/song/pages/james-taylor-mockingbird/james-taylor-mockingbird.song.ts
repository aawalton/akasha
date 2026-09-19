import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMockingbird = {
  id: "01a0b72f-38f5-72d7-865b-8e3b96e52413",
  type: "page-type/song",
  slug: "james-taylor-mockingbird",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79807b2e-51f8-3e90-92ce-06ebda8a9cd2",
      externalLink: "https://musicbrainz.org/work/79807b2e-51f8-3e90-92ce-06ebda8a9cd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mockingbird",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
