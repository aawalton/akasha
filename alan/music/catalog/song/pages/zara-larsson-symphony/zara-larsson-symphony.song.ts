import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSymphony = {
  id: "019ea49e-871f-7be2-a608-17d1720d8e88",
  type: "page-type/song",
  slug: "zara-larsson-symphony",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2466c3b4-6c38-430b-aeb2-7fabee9918b9",
      externalLink: "https://musicbrainz.org/work/2466c3b4-6c38-430b-aeb2-7fabee9918b9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Symphony",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
