import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWestSide = {
  id: "019ea4e4-c7a3-740e-a4f2-56dbd41773f9",
  type: "page-type/song",
  slug: "ariana-grande-west-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4184f032-f0d1-4524-81be-da52c65006d4",
      externalLink: "https://musicbrainz.org/work/4184f032-f0d1-4524-81be-da52c65006d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "west side",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:41:57.283Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
