import type { Song } from "../../song.page-type.ts"

export const kellyClarksonQueenOfTheNight = {
  id: "019ea4b1-b15d-7c45-9792-b528614b7560",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-queen-of-the-night",
  title: "Queen of the Night",
  artistSlug: "kelly-clarkson",
  externalId: "20e9348e-d961-41da-88e9-b8aa3a7267be",
  externalLink: "https://musicbrainz.org/work/20e9348e-d961-41da-88e9-b8aa3a7267be",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
