import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanIKnowMyLove = {
  id: "01a0b720-0aa9-7c81-855d-ea8238b5c07b",
  type: "page-type/song",
  slug: "celtic-woman-i-know-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3561f78a-5b4f-473a-825b-32121f244ad3",
      externalLink: "https://musicbrainz.org/work/3561f78a-5b4f-473a-825b-32121f244ad3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Know My Love",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
