import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWhenLoveReturns = {
  id: "01a0b72f-4f8f-76a7-8b6f-2fcbc241cd66",
  type: "page-type/song",
  slug: "james-taylor-when-love-returns",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "847e67d1-e413-4417-b6b5-11b2edddd6ba",
      externalLink: "https://musicbrainz.org/work/847e67d1-e413-4417-b6b5-11b2edddd6ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When Love Returns",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
