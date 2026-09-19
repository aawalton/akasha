import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaCentury = {
  id: "01a0b726-8d75-7765-993c-43c0878b5185",
  type: "page-type/song",
  slug: "alexandria-century",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fdb19f9c-3299-4a6a-9da6-c0b2fa10f766",
      externalLink: "https://musicbrainz.org/recording/fdb19f9c-3299-4a6a-9da6-c0b2fa10f766",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Century",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
