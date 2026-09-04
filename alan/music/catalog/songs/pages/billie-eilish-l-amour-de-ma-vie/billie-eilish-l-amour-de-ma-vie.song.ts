import type { Song } from "../../song.page-type.ts"

export const billieEilishLAmourDeMaVie = {
  id: "019ea4aa-988c-7ed0-85ca-8055a34ac8b2",
  pageTypeSlug: "song",
  slug: "billie-eilish-l-amour-de-ma-vie",
  title: "L’AMOUR DE MA VIE",
  artistSlug: "billie-eilish",
  externalId: "93393adf-2f14-466c-bf05-e86e990370a6",
  externalLink: "https://musicbrainz.org/work/93393adf-2f14-466c-bf05-e86e990370a6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
