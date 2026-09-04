import type { Song } from "../../song.page-type.ts"

export const siaFlyMeToTheMoon = {
  id: "019ea4c7-3696-7740-b5ff-e0552ff0bebf",
  pageTypeSlug: "song",
  slug: "sia-fly-me-to-the-moon",
  title: "Fly Me to the Moon",
  artistSlug: "sia",
  externalId: "3431f95f-5b1b-3ba3-8ede-da3f8e61b3c4",
  externalLink: "https://musicbrainz.org/work/3431f95f-5b1b-3ba3-8ede-da3f8e61b3c4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
