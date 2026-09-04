import type { Song } from "../../song.page-type.ts"

export const billieEilishBirdsOfAFeather = {
  id: "019ea4a9-b01b-7ced-8184-b9c4eeaf675c",
  pageTypeSlug: "song",
  slug: "billie-eilish-birds-of-a-feather",
  title: "BIRDS OF A FEATHER",
  artistSlug: "billie-eilish",
  externalId: "60b5d8a5-f0c1-4dca-980d-07b3668a802c",
  externalLink: "https://musicbrainz.org/work/60b5d8a5-f0c1-4dca-980d-07b3668a802c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S-",
  singability: "A+",
  tags: ["wanted"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
