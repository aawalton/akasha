import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBeforeIHadLove = {
  id: "01a0b723-c6f6-7d49-8115-08ffa36ed328",
  type: "page-type/song",
  slug: "sabrina-carpenter-before-i-had-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6cfaa733-fb37-4004-b14e-4b0a54bb5fc2",
      externalLink: "https://musicbrainz.org/work/6cfaa733-fb37-4004-b14e-4b0a54bb5fc2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Before I Had Love",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
