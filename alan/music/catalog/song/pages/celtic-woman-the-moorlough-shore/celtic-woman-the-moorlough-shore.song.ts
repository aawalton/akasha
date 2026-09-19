import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheMoorloughShore = {
  id: "01a0b720-129c-7134-bf20-f2532c113b26",
  type: "page-type/song",
  slug: "celtic-woman-the-moorlough-shore",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba5a6615-eda5-4fce-a87b-6183867ecc66",
      externalLink: "https://musicbrainz.org/work/ba5a6615-eda5-4fce-a87b-6183867ecc66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Moorlough Shore",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
