import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhereIsMyBoy = {
  id: "01a0ba61-0101-7910-9499-46f0de5ee4cc",
  type: "page-type/song",
  slug: "coldplay-where-is-my-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fe8ce6de-60f6-4ff5-b7e7-c6761b128264",
      externalLink: "https://musicbrainz.org/work/fe8ce6de-60f6-4ff5-b7e7-c6761b128264",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Where Is My Boy",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
