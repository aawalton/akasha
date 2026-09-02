import type { Song } from "../../song.page-type.ts"

export const mitskiLonesomeLove = {
  id: "019f0ea2-9410-741a-b21b-34b0e593795e",
  pageTypeSlug: "song",
  slug: "mitski-lonesome-love",
  title: "Lonesome Love",
  artistSlug: "mitski",
  externalId: "7c8f44ca-e5cf-48a1-a3cc-5e14a7423500",
  externalLink: "https://musicbrainz.org/work/7c8f44ca-e5cf-48a1-a3cc-5e14a7423500",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
