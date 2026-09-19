import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetBedChem = {
  id: "01a0b111-201d-7a6a-a0db-f9724513db9d",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-bed-chem",
  ownLength: 2.8644833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1UHS8Rf6h5Ar3CDWRd3wjF",
      externalLink: "https://open.spotify.com/track/1UHS8Rf6h5Ar3CDWRd3wjF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bed Chem",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "bedchem|74KM79TiuVKeVCqs8QtB0B|171869",
  song: "song/sabrina-carpenter-bed-chem",
} as const satisfies Track
