import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNothing = {
  id: "019ea4a1-19fd-72bf-a343-89d95680d6e7",
  type: "page-type/song",
  slug: "zara-larsson-nothing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bb0b2ae3-5f24-4860-a803-034dfa8f3c66",
      externalLink: "https://musicbrainz.org/work/bb0b2ae3-5f24-4860-a803-034dfa8f3c66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nothing",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
