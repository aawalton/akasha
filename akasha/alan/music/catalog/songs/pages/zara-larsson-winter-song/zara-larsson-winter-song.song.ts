import type { Song } from "../../song.page-type.ts"

export const zaraLarssonWinterSong = {
  id: "019ea49e-fa5b-7d53-b1fb-cca945aad93d",
  pageTypeSlug: "song",
  slug: "zara-larsson-winter-song",
  title: "Winter Song",
  artistSlug: "zara-larsson",
  externalId: "43209ae9-4ecf-4d7e-b0c3-d7ca77d3f120",
  externalLink: "https://musicbrainz.org/work/43209ae9-4ecf-4d7e-b0c3-d7ca77d3f120",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
