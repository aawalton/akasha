import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonRuinMyLife = {
  id: "019ea49e-26db-7bbc-a68c-4304c3e0a94d",
  type: "page-type/song",
  slug: "zara-larsson-ruin-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15c57443-ecbc-4f85-8cdb-9e66e743b971",
      externalLink: "https://musicbrainz.org/work/15c57443-ecbc-4f85-8cdb-9e66e743b971",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ruin My Life",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
