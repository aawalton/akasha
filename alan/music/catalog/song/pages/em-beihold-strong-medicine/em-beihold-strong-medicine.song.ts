import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdStrongMedicine = {
  id: "019ea4df-2e8a-7198-a4af-ad77c289ecda",
  type: "page-type/song",
  slug: "em-beihold-strong-medicine",
  title: "Strong Medicine",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7935cf8c-a232-4633-8dd7-1b160e3572c3",
      externalLink: "https://musicbrainz.org/work/7935cf8c-a232-4633-8dd7-1b160e3572c3",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "A-",
  tags: ["medication"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
