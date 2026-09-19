import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetSlimPickins = {
  id: "01a0b111-2093-7deb-8950-6edab40a1dd7",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-slim-pickins",
  ownLength: 2.536583333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XkZmBCCcdMY0EPY8ij6Gb",
      externalLink: "https://open.spotify.com/track/0XkZmBCCcdMY0EPY8ij6Gb",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Slim Pickins",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "slimpickins|74KM79TiuVKeVCqs8QtB0B|152195",
  song: "song/sabrina-carpenter-slim-pickins",
} as const satisfies Track
