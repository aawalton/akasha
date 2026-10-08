import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrande7Rings = {
  id: "019ea4e3-0ea6-7326-ad23-71ad3253c0d4",
  type: "page-type/song",
  slug: "ariana-grande-7-rings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5627afa-416f-4854-8db3-a29a5ece4654",
      externalLink: "https://musicbrainz.org/work/c5627afa-416f-4854-8db3-a29a5ece4654",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "7 rings",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:40:04.390Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
