import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiExhale = {
  id: "01a0b111-25a7-75cc-95d0-5402b6e92af2",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-exhale",
  ownLength: 2.7451333333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CagMrZXJUdGGIw6Eaepos",
      externalLink: "https://open.spotify.com/track/6CagMrZXJUdGGIw6Eaepos",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Exhale",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "exhale|74KM79TiuVKeVCqs8QtB0B|164708",
  song: "song/sabrina-carpenter-exhale",
} as const satisfies Track
