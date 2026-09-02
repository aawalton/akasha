import type { Song } from "../../song.page-type.ts"

export const arianaGrandeLABoyz = {
  id: "019ea4e1-6ad7-7b11-bf6e-ada7c2e082ca",
  pageTypeSlug: "song",
  slug: "ariana-grande-l-a-boyz",
  title: "L.A. Boyz",
  artistSlug: "ariana-grande",
  externalId: "5a826084-fdb6-4de6-907e-6ef379f049ec",
  externalLink: "https://musicbrainz.org/work/5a826084-fdb6-4de6-907e-6ef379f049ec",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
