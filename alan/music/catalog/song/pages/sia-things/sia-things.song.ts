import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaThings = {
  id: "01a0ba9e-36b7-78a2-acb5-e13993c5dc55",
  type: "page-type/song",
  slug: "sia-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a61fb7e5-701c-43fb-ac54-c98c087fb1d7",
      externalLink: "https://musicbrainz.org/work/a61fb7e5-701c-43fb-ac54-c98c087fb1d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Things",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
