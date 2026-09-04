import type { Song } from "../../song.page-type.ts"

export const siaPlayDumb = {
  id: "019ea4ce-1b16-76bf-a312-7d97fdfb5448",
  pageTypeSlug: "song",
  slug: "sia-play-dumb",
  title: "Play Dumb",
  artistSlug: "sia",
  externalId: "c67ac09c-2e93-4c5c-a599-9edb105a7857",
  externalLink: "https://musicbrainz.org/work/c67ac09c-2e93-4c5c-a599-9edb105a7857",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
