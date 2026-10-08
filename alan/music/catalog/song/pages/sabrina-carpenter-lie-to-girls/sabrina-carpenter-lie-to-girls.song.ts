import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterLieToGirls = {
  id: "01a0b723-d0c3-7ea3-bf65-aab466648cb9",
  type: "page-type/song",
  slug: "sabrina-carpenter-lie-to-girls",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fee976b0-a697-4ab4-baef-f24b0f0e1844",
      externalLink: "https://musicbrainz.org/work/fee976b0-a697-4ab4-baef-f24b0f0e1844",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lie to Girls",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:32.867Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
