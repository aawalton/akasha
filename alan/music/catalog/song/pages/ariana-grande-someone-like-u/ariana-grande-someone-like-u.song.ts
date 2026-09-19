import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSomeoneLikeU = {
  id: "019ea4e4-8c71-7819-a733-b29643bbfca0",
  type: "page-type/song",
  slug: "ariana-grande-someone-like-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37894bde-af3a-4f79-8063-d01d13372cb4",
      externalLink: "https://musicbrainz.org/work/37894bde-af3a-4f79-8063-d01d13372cb4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "someone like u",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
