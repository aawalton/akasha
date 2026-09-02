import type { Song } from "../../song.page-type.ts"

export const auroraDaydreamer = {
  id: "019ea4a7-5486-7a6c-946a-aee8371287f4",
  pageTypeSlug: "song",
  slug: "aurora-daydreamer",
  title: "Daydreamer",
  artistSlug: "aurora",
  externalId: "ea7f5965-a2b1-47fe-af60-ec81ff8d6c6d",
  externalLink: "https://musicbrainz.org/work/ea7f5965-a2b1-47fe-af60-ec81ff8d6c6d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
