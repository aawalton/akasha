import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBirdsOfAFeather = {
  id: "019ea4a9-b01b-7ced-8184-b9c4eeaf675c",
  type: "page-type/song",
  slug: "billie-eilish-birds-of-a-feather",
  rank: "S-",
  tags: ["wanted"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60b5d8a5-f0c1-4dca-980d-07b3668a802c",
      externalLink: "https://musicbrainz.org/work/60b5d8a5-f0c1-4dca-980d-07b3668a802c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "BIRDS OF A FEATHER",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A+",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
