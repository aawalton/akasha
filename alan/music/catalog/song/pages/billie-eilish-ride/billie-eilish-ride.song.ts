import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishRide = {
  id: "019ea4ab-d74e-76ec-9eaf-54d765204f6d",
  type: "page-type/song",
  slug: "billie-eilish-ride",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1525b05-6c03-4e78-9ac8-628267051720",
      externalLink: "https://musicbrainz.org/work/e1525b05-6c03-4e78-9ac8-628267051720",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ride",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
