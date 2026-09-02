import type { Song } from "../../song.page-type.ts"

export const billieEilishEverybodyDies = {
  id: "019ea4a9-b701-78c1-9064-3ab0e0947159",
  pageTypeSlug: "song",
  slug: "billie-eilish-everybody-dies",
  title: "Everybody Dies",
  artistSlug: "billie-eilish",
  externalId: "610dc24d-f72f-4f22-b577-99b9bc8f2105",
  externalLink: "https://musicbrainz.org/work/610dc24d-f72f-4f22-b577-99b9bc8f2105",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
