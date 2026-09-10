import type { Song } from "../../song.page-type.types.ts"

export const arianaGrandeWithoutLove = {
  id: "019ea4e4-562f-72e7-bdc8-44976f08d349",
  pageTypeSlug: "song",
  type: "song",
  slug: "ariana-grande-without-love",
  title: "Without Love",
  artist: "ariana-grande",
  externalId: "2802f105-1f19-3538-a716-08efe5abad72",
  externalLink: "https://musicbrainz.org/work/2802f105-1f19-3538-a716-08efe5abad72",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
