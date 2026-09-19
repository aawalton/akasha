import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWishIWasHere = {
  id: "01a0ba60-fef7-7c17-abbf-d70bfd28522b",
  type: "page-type/song",
  slug: "coldplay-wish-i-was-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "06528d61-487b-45d2-8659-604fc72752b6",
      externalLink: "https://musicbrainz.org/work/06528d61-487b-45d2-8659-604fc72752b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wish I Was Here",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
