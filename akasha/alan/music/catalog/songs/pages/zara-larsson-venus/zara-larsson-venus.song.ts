import type { Song } from "../../song.page-type.ts"

export const zaraLarssonVenus = {
  id: "019ea4a1-d6cf-7f1f-81ee-52abfa9035b3",
  pageTypeSlug: "song",
  slug: "zara-larsson-venus",
  title: "Venus",
  artistSlug: "zara-larsson",
  externalId: "d89f899d-2027-4c41-a77c-70d8183343c4",
  externalLink: "https://musicbrainz.org/work/d89f899d-2027-4c41-a77c-70d8183343c4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
