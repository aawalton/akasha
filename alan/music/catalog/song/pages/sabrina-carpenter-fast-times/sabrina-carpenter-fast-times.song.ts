import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFastTimes = {
  id: "01a0b723-c749-7dcd-9112-20eb1d1cc355",
  type: "page-type/song",
  slug: "sabrina-carpenter-fast-times",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f11e29b-fd97-46e2-a30b-6ef3170aa9e6",
      externalLink: "https://musicbrainz.org/work/6f11e29b-fd97-46e2-a30b-6ef3170aa9e6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fast Times",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
