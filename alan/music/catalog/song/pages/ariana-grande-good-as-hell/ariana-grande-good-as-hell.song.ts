import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGoodAsHell = {
  id: "019ea4e3-d28d-767e-a3fc-fa255feda4d6",
  type: "page-type/song",
  slug: "ariana-grande-good-as-hell",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e55c3b0e-e8e1-4794-9ff9-6967d4b577c2",
      externalLink: "https://musicbrainz.org/work/e55c3b0e-e8e1-4794-9ff9-6967d4b577c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good as Hell",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
