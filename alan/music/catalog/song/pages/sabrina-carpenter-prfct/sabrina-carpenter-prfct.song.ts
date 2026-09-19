import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterPrfct = {
  id: "01a0b723-cbd5-7dca-b61a-83c234a38bb2",
  type: "page-type/song",
  slug: "sabrina-carpenter-prfct",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b37b118d-739c-469c-82e4-cc5aa3bb7461",
      externalLink: "https://musicbrainz.org/work/b37b118d-739c-469c-82e4-cc5aa3bb7461",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "prfct",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
