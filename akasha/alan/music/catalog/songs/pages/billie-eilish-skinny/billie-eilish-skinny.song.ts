import type { Song } from "../../song.page-type.ts"

export const billieEilishSkinny = {
  id: "019ea4ab-91c1-7532-b7df-32c9d588183e",
  pageTypeSlug: "song",
  slug: "billie-eilish-skinny",
  title: "SKINNY",
  artistSlug: "billie-eilish",
  externalId: "d8cc850d-10be-4895-8b2f-eb6cd9dee77c",
  externalLink: "https://musicbrainz.org/work/d8cc850d-10be-4895-8b2f-eb6cd9dee77c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
