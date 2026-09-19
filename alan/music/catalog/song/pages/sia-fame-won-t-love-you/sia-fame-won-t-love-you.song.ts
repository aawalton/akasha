import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFameWonTLoveYou = {
  id: "019ea4c3-44ec-7e80-a148-2ec6648573cd",
  type: "page-type/song",
  slug: "sia-fame-won-t-love-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a9c6108-239a-4467-851d-d32258110591",
      externalLink: "https://musicbrainz.org/work/2a9c6108-239a-4467-851d-d32258110591",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fame Won’t Love You",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
