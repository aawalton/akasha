import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaMyWorld = {
  id: "01a0b726-8f58-765e-b8ec-1afcc55222cb",
  type: "page-type/song",
  slug: "alexandria-my-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a14eb0f-17eb-4471-a85f-b1d6c9d1d04a",
      externalLink: "https://musicbrainz.org/recording/0a14eb0f-17eb-4471-a85f-b1d6c9d1d04a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My World",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
