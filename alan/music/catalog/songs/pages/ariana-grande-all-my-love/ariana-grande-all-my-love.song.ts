import type { Song } from "../../song.page-type.ts"

export const arianaGrandeAllMyLove = {
  id: "019ea4e2-f73e-78c6-be13-00e14893a30e",
  pageTypeSlug: "song",
  slug: "ariana-grande-all-my-love",
  title: "All My Love",
  artistSlug: "ariana-grande",
  externalId: "be7915d4-60a6-4433-b930-e19d7099fb72",
  externalLink: "https://musicbrainz.org/work/be7915d4-60a6-4433-b930-e19d7099fb72",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
