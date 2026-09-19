import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLipsLikeSugar = {
  id: "01a0ba60-f6e0-718e-8491-741596070b8d",
  type: "page-type/song",
  slug: "coldplay-lips-like-sugar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab22f701-7ba6-3688-b261-2a8114aa70b8",
      externalLink: "https://musicbrainz.org/work/ab22f701-7ba6-3688-b261-2a8114aa70b8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lips Like Sugar",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
