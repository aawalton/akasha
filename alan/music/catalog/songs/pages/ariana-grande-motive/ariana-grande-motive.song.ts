import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMotive = {
  id: "019ea4e5-d83c-7816-a5bc-255bc35fca92",
  pageTypeSlug: "song",
  slug: "ariana-grande-motive",
  title: "motive",
  artistSlug: "ariana-grande",
  externalId: "6a6e99dc-64f6-40b9-bc55-9a344f5c43aa",
  externalLink: "https://musicbrainz.org/work/6a6e99dc-64f6-40b9-bc55-9a344f5c43aa",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
