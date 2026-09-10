import type { Song } from "../../song.page-type.types.ts"

export const billieEilishRide = {
  id: "019ea4ab-d74e-76ec-9eaf-54d765204f6d",
  pageTypeSlug: "song",
  type: "song",
  slug: "billie-eilish-ride",
  title: "Ride",
  artist: "billie-eilish",
  externalId: "e1525b05-6c03-4e78-9ac8-628267051720",
  externalLink: "https://musicbrainz.org/work/e1525b05-6c03-4e78-9ac8-628267051720",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
