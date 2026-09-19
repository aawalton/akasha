import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaNo = {
  id: "01a0b726-8f88-70b9-9de9-1e2f63bff38b",
  type: "page-type/song",
  slug: "alexandria-no",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92cd24e9-b9cf-4d10-ae31-20806e973d16",
      externalLink: "https://musicbrainz.org/recording/92cd24e9-b9cf-4d10-ae31-20806e973d16",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
