import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyContortionist = {
  id: "01a0b725-ae83-74ac-a1d8-0bf0e960b112",
  type: "page-type/song",
  slug: "sylvia-daley-contortionist",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78ab150b-6117-4da8-9481-59717364adbe",
      externalLink: "https://musicbrainz.org/work/78ab150b-6117-4da8-9481-59717364adbe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Contortionist",
  artist: "artist/sylvia-daley",
  performed: true,
  written: "collab",
  createdAt: "2026-09-19T00:51:35.171Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
