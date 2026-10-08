import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorK = {
  id: "01a0b72f-3553-7eb6-89b3-136e78be9dd1",
  type: "page-type/song",
  slug: "james-taylor-k",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "39e0a178-e5f0-4a9c-8e9d-bf5696f2923b",
      externalLink: "https://musicbrainz.org/work/39e0a178-e5f0-4a9c-8e9d-bf5696f2923b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kø",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
  createdAt: "2026-09-19T01:01:59.507Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
