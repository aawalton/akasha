import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBringNight = {
  id: "019ea4c4-0841-727a-87aa-57aded4b2e9d",
  type: "page-type/song",
  slug: "sia-bring-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "667fda31-9b52-444d-8ead-7f33cc5ff9f5",
      externalLink: "https://musicbrainz.org/work/667fda31-9b52-444d-8ead-7f33cc5ff9f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring Night",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
