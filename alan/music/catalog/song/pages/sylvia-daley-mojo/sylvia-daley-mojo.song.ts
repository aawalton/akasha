import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyMojo = {
  id: "01a0b725-aefd-763c-aad4-88c86e2fdae3",
  type: "page-type/song",
  slug: "sylvia-daley-mojo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bf74bbfe-ba15-4b6a-9cdc-9232c23dc9a9",
      externalLink: "https://musicbrainz.org/work/bf74bbfe-ba15-4b6a-9cdc-9232c23dc9a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mojo",
  artist: "artist/sylvia-daley",
  performed: false,
  written: "collab",
} as const satisfies Song
