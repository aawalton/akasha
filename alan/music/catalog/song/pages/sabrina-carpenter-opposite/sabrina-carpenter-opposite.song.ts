import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterOpposite = {
  id: "01a0b723-ca90-74e7-98c4-176752eae269",
  type: "page-type/song",
  slug: "sabrina-carpenter-opposite",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ea14dcc-24d4-4497-b828-6bf5a98bfa28",
      externalLink: "https://musicbrainz.org/work/9ea14dcc-24d4-4497-b828-6bf5a98bfa28",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "opposite",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
