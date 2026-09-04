import type { Song } from "../../song.page-type.ts"

export const mitskiBetweenTheBreaths = {
  id: "019f0e9e-43c4-77d9-85ca-4b4968505bcc",
  pageTypeSlug: "song",
  slug: "mitski-between-the-breaths",
  title: "Between the Breaths",
  artistSlug: "mitski",
  externalId: "318e44e6-3f6c-4e58-a674-ebedc3edd831",
  externalLink: "https://musicbrainz.org/work/318e44e6-3f6c-4e58-a674-ebedc3edd831",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
