import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDrinkToGetDrunk = {
  id: "019ea4c5-1730-7da0-a08b-d6546510ceb4",
  type: "page-type/song",
  slug: "sia-drink-to-get-drunk",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0d65d9f-843e-4e75-80ec-e3ca0db5c0e7",
      externalLink: "https://musicbrainz.org/work/a0d65d9f-843e-4e75-80ec-e3ca0db5c0e7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Drink to Get Drunk",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:07:20.496Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
