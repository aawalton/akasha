import type { Song } from "../../song.page-type.types.ts"

export const mitskiOldFriend = {
  id: "019f0e9f-b61e-7c18-9e72-33b086ec67f5",
  pageTypeSlug: "song",
  type: "song",
  slug: "mitski-old-friend",
  title: "Old Friend",
  artist: "mitski",
  externalId: "4795e634-8335-4978-948f-ea4dd8f0e520",
  externalLink: "https://musicbrainz.org/work/4795e634-8335-4978-948f-ea4dd8f0e520",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
