import type { Song } from "../../song.page-type.ts"

export const auroraADangerousThing = {
  id: "019ea4a2-ff9b-7b28-8f24-6f5fb7de4d1f",
  pageTypeSlug: "song",
  slug: "aurora-a-dangerous-thing",
  title: "A Dangerous Thing",
  artistSlug: "aurora",
  externalId: "0c390168-525f-4fb3-b2b9-1e0b5127ea8e",
  externalLink: "https://musicbrainz.org/work/0c390168-525f-4fb3-b2b9-1e0b5127ea8e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A",
  singability: "B",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
