import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaVitalForce = {
  id: "01a0b726-90f4-7df8-a9b7-5164593a9495",
  type: "page-type/song",
  slug: "alexandria-vital-force",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e85da5e-6fb4-460d-98d9-de259c296acd",
      externalLink: "https://musicbrainz.org/recording/5e85da5e-6fb4-460d-98d9-de259c296acd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Vital Force",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
