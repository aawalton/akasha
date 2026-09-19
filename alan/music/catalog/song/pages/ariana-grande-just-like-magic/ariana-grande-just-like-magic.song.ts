import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeJustLikeMagic = {
  id: "019ea4e2-4071-7e4b-b11b-e528ef53d6a7",
  type: "page-type/song",
  slug: "ariana-grande-just-like-magic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8ad9a295-c6ba-4dbc-8bbc-e49250ec8938",
      externalLink: "https://musicbrainz.org/work/8ad9a295-c6ba-4dbc-8bbc-e49250ec8938",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "just like magic",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
