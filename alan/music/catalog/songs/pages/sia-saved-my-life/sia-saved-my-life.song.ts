import type { Song } from "../../song.page-type.ts"

export const siaSavedMyLife = {
  id: "019ea4ce-2360-7b95-b144-6fdef0effcd8",
  pageTypeSlug: "song",
  slug: "sia-saved-my-life",
  title: "Saved My Life",
  artistSlug: "sia",
  externalId: "c986fab3-d026-4613-8765-62e0fb143065",
  externalLink: "https://musicbrainz.org/work/c986fab3-d026-4613-8765-62e0fb143065",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
