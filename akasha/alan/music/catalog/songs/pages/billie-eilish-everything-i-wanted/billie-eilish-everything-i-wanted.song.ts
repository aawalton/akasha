import type { Song } from "../../song.page-type.ts"

export const billieEilishEverythingIWanted = {
  id: "019ea4aa-916e-7864-afdd-c795d9b6b656",
  pageTypeSlug: "song",
  slug: "billie-eilish-everything-i-wanted",
  title: "everything i wanted",
  artistSlug: "billie-eilish",
  externalId: "925e99ae-619a-4bb0-9799-2de17ab68bec",
  externalLink: "https://musicbrainz.org/work/925e99ae-619a-4bb0-9799-2de17ab68bec",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S",
  singability: "A",
  tags: ["suicide"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
