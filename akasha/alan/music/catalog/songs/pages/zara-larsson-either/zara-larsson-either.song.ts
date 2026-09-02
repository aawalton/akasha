import type { Song } from "../../song.page-type.ts"

export const zaraLarssonEither = {
  id: "019ea49f-8191-791e-a5b9-5165fe2b120e",
  pageTypeSlug: "song",
  slug: "zara-larsson-either",
  title: "Either",
  artistSlug: "zara-larsson",
  externalId: "51634f67-3c06-4a35-8310-40d8ded440f5",
  externalLink: "https://musicbrainz.org/work/51634f67-3c06-4a35-8310-40d8ded440f5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
