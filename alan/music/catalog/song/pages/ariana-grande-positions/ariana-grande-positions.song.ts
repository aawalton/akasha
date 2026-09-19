import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePositions = {
  id: "019ea4e6-de1b-75f6-9756-8edccddb01fc",
  type: "page-type/song",
  slug: "ariana-grande-positions",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a225b3d5-bb35-4de3-bf0c-ef3f54dc0084",
      externalLink: "https://musicbrainz.org/work/a225b3d5-bb35-4de3-bf0c-ef3f54dc0084",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "positions",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
