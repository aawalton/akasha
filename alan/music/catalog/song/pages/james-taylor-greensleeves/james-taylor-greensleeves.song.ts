import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGreensleeves = {
  id: "01a0b72f-2020-7544-ad59-84bbbe5611da",
  type: "page-type/song",
  slug: "james-taylor-greensleeves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0bb7d2ad-0a44-3b73-bbbc-5eed6e3b0117",
      externalLink: "https://musicbrainz.org/work/0bb7d2ad-0a44-3b73-bbbc-5eed6e3b0117",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Greensleeves",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
