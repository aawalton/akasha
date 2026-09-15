import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWhereIsTheLove = {
  id: "019ea4e8-2009-7a4d-9080-57082b08aa60",
  type: "page-type/song",
  slug: "ariana-grande-where-is-the-love",
  title: "Where Is the Love?",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ec4b3465-08a3-3136-8fe2-f396bb200eac",
      externalLink: "https://musicbrainz.org/work/ec4b3465-08a3-3136-8fe2-f396bb200eac",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
