import type { Song } from "../../song.page-type.ts"

export const billieEilishOxytocin = {
  id: "019ea4ab-3fe3-734d-a757-211ade851628",
  pageTypeSlug: "song",
  slug: "billie-eilish-oxytocin",
  title: "Oxytocin",
  artistSlug: "billie-eilish",
  externalId: "cbd51937-25cc-4e17-aa0a-f9c733a05ab9",
  externalLink: "https://musicbrainz.org/work/cbd51937-25cc-4e17-aa0a-f9c733a05ab9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
