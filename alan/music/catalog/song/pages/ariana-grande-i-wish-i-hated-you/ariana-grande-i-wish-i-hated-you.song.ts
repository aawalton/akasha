import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIWishIHatedYou = {
  id: "019ea4e1-3eac-7430-95da-2c5e4a74a707",
  type: "page-type/song",
  slug: "ariana-grande-i-wish-i-hated-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4bacb923-79cd-46c9-8d36-80fe942850b6",
      externalLink: "https://musicbrainz.org/work/4bacb923-79cd-46c9-8d36-80fe942850b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "i wish i hated you",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
