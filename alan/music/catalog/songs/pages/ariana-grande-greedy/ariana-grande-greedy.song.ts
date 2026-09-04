import type { Song } from "../../song.page-type.ts"

export const arianaGrandeGreedy = {
  id: "019ea4e2-8420-7af1-a7cd-1c9d47ebd8cd",
  pageTypeSlug: "song",
  slug: "ariana-grande-greedy",
  title: "Greedy",
  artistSlug: "ariana-grande",
  externalId: "a0341ff5-f817-43c0-84fc-bed2d6b63495",
  externalLink: "https://musicbrainz.org/work/a0341ff5-f817-43c0-84fc-bed2d6b63495",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
