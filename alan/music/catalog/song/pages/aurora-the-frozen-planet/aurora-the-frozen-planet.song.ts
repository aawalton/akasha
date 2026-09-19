import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheFrozenPlanet = {
  id: "019ea4a4-84c6-72d8-abe8-4e436d4f77c9",
  type: "page-type/song",
  slug: "aurora-the-frozen-planet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47d394c7-a959-4709-8747-14587247770b",
      externalLink: "https://musicbrainz.org/work/47d394c7-a959-4709-8747-14587247770b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Frozen Planet",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
