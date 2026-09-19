import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdLottery = {
  id: "019ea4df-35c3-769f-99e4-74584f9a58f9",
  type: "page-type/song",
  slug: "em-beihold-lottery",
  title: "Lottery",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9729f0d0-445d-4480-ad52-f7de6ac64cd8",
      externalLink: "https://musicbrainz.org/work/9729f0d0-445d-4480-ad52-f7de6ac64cd8",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
