import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorChurchShout = {
  id: "01a0b72f-2ecb-7fbb-ad7d-e63d37139733",
  type: "page-type/song",
  slug: "james-taylor-church-shout",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c57939ed-9c17-4090-a507-68a5327ee5c7",
      externalLink: "https://musicbrainz.org/work/c57939ed-9c17-4090-a507-68a5327ee5c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Church Shout",
  artist: "artist/james-taylor",
  performed: false,
  written: "solo",
} as const satisfies Song
