import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdEggInTheBackseat = {
  id: "019ea4df-1a7a-7cb8-927d-6149d99a808e",
  type: "page-type/song",
  slug: "em-beihold-egg-in-the-backseat",
  title: "Egg in the Backseat",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b01fe29-9ab5-4b9d-9715-7e501391856e",
      externalLink: "https://musicbrainz.org/work/4b01fe29-9ab5-4b9d-9715-7e501391856e",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A-",
  singability: "B+",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
