import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIceCream = {
  id: "019ea4e1-a93e-7f81-8db1-a23936480bb9",
  type: "page-type/song",
  slug: "ariana-grande-ice-cream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "686db009-9a5e-452c-9bc0-518f2ac29fd1",
      externalLink: "https://musicbrainz.org/work/686db009-9a5e-452c-9bc0-518f2ac29fd1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ice Cream",
  artist: "artist/ariana-grande",
  performed: false,
  written: "collab",
} as const satisfies Song
