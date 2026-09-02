import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSantaBaby = {
  id: "019ea416-39ae-7fe8-9718-1904714a5cb7",
  pageTypeSlug: "song",
  slug: "ariana-grande-santa-baby",
  title: "Santa Baby",
  artistSlug: "ariana-grande",
  externalId: "a10d7ca4-2dea-3127-b84c-b15fdd24b026",
  externalLink: "https://musicbrainz.org/work/a10d7ca4-2dea-3127-b84c-b15fdd24b026",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
