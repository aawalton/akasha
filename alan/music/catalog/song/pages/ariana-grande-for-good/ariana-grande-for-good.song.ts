import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeForGood = {
  id: "019ea4e3-8441-71b4-9570-280f35780c13",
  type: "page-type/song",
  slug: "ariana-grande-for-good",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0259bdb-17bf-4ba0-bcaf-5a7d2014857b",
      externalLink: "https://musicbrainz.org/work/e0259bdb-17bf-4ba0-bcaf-5a7d2014857b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "For Good",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
