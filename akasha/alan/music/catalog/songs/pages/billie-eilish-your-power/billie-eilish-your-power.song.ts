import type { Song } from "../../song.page-type.ts"

export const billieEilishYourPower = {
  id: "019ea4a8-495e-7f2d-be55-653445380f3b",
  pageTypeSlug: "song",
  slug: "billie-eilish-your-power",
  title: "Your Power",
  artistSlug: "billie-eilish",
  externalId: "03a75386-2a79-40dd-aaf0-3304d12f7fe1",
  externalLink: "https://musicbrainz.org/work/03a75386-2a79-40dd-aaf0-3304d12f7fe1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A-",
  singability: "B-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
