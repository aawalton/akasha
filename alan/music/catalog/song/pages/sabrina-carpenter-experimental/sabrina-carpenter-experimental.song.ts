import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterExperimental = {
  id: "01a0b723-c605-7cab-b7ed-520a2dc71cd8",
  type: "page-type/song",
  slug: "sabrina-carpenter-experimental",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e50271d-d5fc-4946-b55c-9890616cfcc5",
      externalLink: "https://musicbrainz.org/work/5e50271d-d5fc-4946-b55c-9890616cfcc5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "experimental",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
