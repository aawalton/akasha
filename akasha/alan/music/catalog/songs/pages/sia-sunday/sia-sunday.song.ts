import type { Song } from "../../song.page-type.ts"

export const siaSunday = {
  id: "019ea4ce-3841-70c6-97b3-19ff2bfd7360",
  pageTypeSlug: "song",
  slug: "sia-sunday",
  title: "Sunday",
  artistSlug: "sia",
  externalId: "db97b949-0b2a-4811-881c-f70ef71363c6",
  externalLink: "https://musicbrainz.org/work/db97b949-0b2a-4811-881c-f70ef71363c6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
