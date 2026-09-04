import type { Song } from "../../song.page-type.ts"

export const billieEilishMyBoy = {
  id: "019ea4ab-61b7-71ac-a255-4f55550d5787",
  pageTypeSlug: "song",
  slug: "billie-eilish-my-boy",
  title: "my boy",
  artistSlug: "billie-eilish",
  externalId: "d750625e-d2d3-4c60-92f6-c5ae9b1e1b10",
  externalLink: "https://musicbrainz.org/work/d750625e-d2d3-4c60-92f6-c5ae9b1e1b10",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
