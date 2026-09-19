import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonEither = {
  id: "019ea49f-8191-791e-a5b9-5165fe2b120e",
  type: "page-type/song",
  slug: "zara-larsson-either",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51634f67-3c06-4a35-8310-40d8ded440f5",
      externalLink: "https://musicbrainz.org/work/51634f67-3c06-4a35-8310-40d8ded440f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Either",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
