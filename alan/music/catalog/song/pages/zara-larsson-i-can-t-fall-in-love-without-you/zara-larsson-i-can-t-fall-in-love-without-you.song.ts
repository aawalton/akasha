import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonICanTFallInLoveWithoutYou = {
  id: "019ea4a1-2c05-7fc6-8bac-b340fbe055cc",
  type: "page-type/song",
  slug: "zara-larsson-i-can-t-fall-in-love-without-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bde3852d-c1e9-4755-8126-f77bad5a2b6a",
      externalLink: "https://musicbrainz.org/work/bde3852d-c1e9-4755-8126-f77bad5a2b6a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can’t Fall in Love Without You",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
