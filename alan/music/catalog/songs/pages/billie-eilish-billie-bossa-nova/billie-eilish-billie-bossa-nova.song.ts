import type { Song } from "../../song.page-type.ts"

export const billieEilishBillieBossaNova = {
  id: "019ea4ac-028c-72bb-bdc1-c5b5df94acd1",
  pageTypeSlug: "song",
  slug: "billie-eilish-billie-bossa-nova",
  title: "Billie Bossa Nova",
  artistSlug: "billie-eilish",
  externalId: "e778d68e-3e92-4b99-8d9b-712db81153c8",
  externalLink: "https://musicbrainz.org/work/e778d68e-3e92-4b99-8d9b-712db81153c8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
