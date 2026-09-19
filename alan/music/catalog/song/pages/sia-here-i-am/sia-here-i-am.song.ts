import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHereIAm = {
  id: "019ea4c8-2a60-7ddc-89ca-1636a24475d2",
  type: "page-type/song",
  slug: "sia-here-i-am",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c1abc82-4682-4666-a7fc-3031c76d4113",
      externalLink: "https://musicbrainz.org/work/6c1abc82-4682-4666-a7fc-3031c76d4113",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Here I Am",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
