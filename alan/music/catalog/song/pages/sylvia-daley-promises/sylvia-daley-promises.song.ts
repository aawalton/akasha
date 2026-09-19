import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyPromises = {
  id: "01a0b725-af15-798c-bb65-a3be1f4ef780",
  type: "page-type/song",
  slug: "sylvia-daley-promises",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d662da03-9768-4ea4-a0d8-bd70bb6ff174",
      externalLink: "https://musicbrainz.org/work/d662da03-9768-4ea4-a0d8-bd70bb6ff174",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Promises",
  artist: "artist/sylvia-daley",
  performed: false,
  written: "collab",
} as const satisfies Song
