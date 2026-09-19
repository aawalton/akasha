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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
