import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSuccessful = {
  id: "019ea4e6-7878-7107-a907-3848e9af7aea",
  type: "page-type/song",
  slug: "ariana-grande-successful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97244411-b3c5-494f-8171-d4683d140817",
      externalLink: "https://musicbrainz.org/work/97244411-b3c5-494f-8171-d4683d140817",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "successful",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:43:48.088Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
