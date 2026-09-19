import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFeelsLikeHeaven = {
  id: "01a0ba9e-1816-7a93-bb7f-d563ef36895a",
  type: "page-type/song",
  slug: "sia-feels-like-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "402991c6-d442-471b-abf6-2f82bb2f6b75",
      externalLink: "https://musicbrainz.org/work/402991c6-d442-471b-abf6-2f82bb2f6b75",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Feels Like Heaven",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
