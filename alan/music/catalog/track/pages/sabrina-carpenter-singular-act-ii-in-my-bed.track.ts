import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiInMyBed = {
  id: "01a0b111-24e9-7820-9137-e0d0cc847637",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-in-my-bed",
  ownLength: 3.166333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FjD1jpm51dH5LzLvrDVPY",
      externalLink: "https://open.spotify.com/track/1FjD1jpm51dH5LzLvrDVPY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "In My Bed",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "inmybed|74KM79TiuVKeVCqs8QtB0B|189980",
  song: "song/sabrina-carpenter-in-my-bed",
} as const satisfies Track
