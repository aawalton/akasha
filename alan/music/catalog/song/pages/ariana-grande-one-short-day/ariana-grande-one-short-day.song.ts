import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOneShortDay = {
  id: "019ea4e8-9e51-7413-ad3e-81352c7ba5ff",
  type: "page-type/song",
  slug: "ariana-grande-one-short-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc8b976a-3704-4480-88a6-d995d16d093e",
      externalLink: "https://musicbrainz.org/work/fc8b976a-3704-4480-88a6-d995d16d093e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Short Day",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:46:08.849Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
