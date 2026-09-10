import type { Song } from "../../song.page-type.types.ts"

export const lilithMaxStillWithMe = {
  id: "019ea4f6-5e9b-78ab-8519-e8e0ab283e25",
  pageTypeSlug: "song",
  type: "song",
  slug: "lilith-max-still-with-me",
  title: "Still with Me",
  artist: "lilith-max",
  externalId: "1a3f08ab-8bef-458b-a378-40819649afda",
  externalLink: "https://musicbrainz.org/recording/1a3f08ab-8bef-458b-a378-40819649afda",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
