import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTreadLightly = {
  id: "01a0b720-0f53-72d3-bcbe-bb3ff41dc73b",
  type: "page-type/song",
  slug: "celtic-woman-tread-lightly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d900701-4165-443a-8962-a04f5b84167e",
      externalLink: "https://musicbrainz.org/work/7d900701-4165-443a-8962-a04f5b84167e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tread Lightly",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
