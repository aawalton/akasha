import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeEveryday = {
  id: "019ea4e0-a419-7607-b9b5-36d69ada79f1",
  type: "page-type/song",
  slug: "ariana-grande-everyday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1c057afd-6f3a-4cea-b30d-6f53658708cb",
      externalLink: "https://musicbrainz.org/work/1c057afd-6f3a-4cea-b30d-6f53658708cb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everyday",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:37:26.041Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
