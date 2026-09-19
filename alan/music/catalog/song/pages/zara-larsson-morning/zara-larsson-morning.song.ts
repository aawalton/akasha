import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMorning = {
  id: "019ea49d-dc54-7235-a92c-53a129e547af",
  type: "page-type/song",
  slug: "zara-larsson-morning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b5ac469-a646-44a3-a0a5-a574c1725830",
      externalLink: "https://musicbrainz.org/work/0b5ac469-a646-44a3-a0a5-a574c1725830",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Morning",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
