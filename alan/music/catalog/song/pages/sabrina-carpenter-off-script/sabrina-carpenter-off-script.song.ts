import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterOffScript = {
  id: "01a0b723-c7a3-722e-8923-df77b6e842df",
  type: "page-type/song",
  slug: "sabrina-carpenter-off-script",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "74002fef-a09d-409e-b40d-5686965b21f0",
      externalLink: "https://musicbrainz.org/work/74002fef-a09d-409e-b40d-5686965b21f0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "off script",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
