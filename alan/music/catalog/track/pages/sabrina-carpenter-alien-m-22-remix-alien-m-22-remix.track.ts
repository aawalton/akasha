import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlienM22RemixAlienM22Remix = {
  id: "01a0b111-31aa-7a61-a476-d3a41fa69c96",
  type: "page-type/track",
  slug: "sabrina-carpenter-alien-m-22-remix-alien-m-22-remix",
  ownLength: 3.419983333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-alien-m-22-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "18YI6FM5DHrSdiO4ylzVfj",
      externalLink: "https://open.spotify.com/track/18YI6FM5DHrSdiO4ylzVfj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Alien - M-22 Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1HBjj22wzbscIZ9sEb5dyf", artistName: "Jonas Blue" },
    { externalId: "4WFtYn5RyU8VGPpPyW9Pxw", artistName: "M-22" },
  ],
  trackKey:
    "alienm22remix|1HBjj22wzbscIZ9sEb5dyf,4WFtYn5RyU8VGPpPyW9Pxw,74KM79TiuVKeVCqs8QtB0B|205199",
  song: "song/sabrina-carpenter-alien-m-22-remix",
} as const satisfies Track
