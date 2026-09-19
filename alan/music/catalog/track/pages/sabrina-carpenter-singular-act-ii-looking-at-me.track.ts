import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiLookingAtMe = {
  id: "01a0b111-25f2-7e94-a78e-63ce2df4c09a",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-looking-at-me",
  ownLength: 3.018666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59tskctgqUmjCWAwhzYAFm",
      externalLink: "https://open.spotify.com/track/59tskctgqUmjCWAwhzYAFm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Looking at Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "lookingatme|74KM79TiuVKeVCqs8QtB0B|181120",
  song: "song/sabrina-carpenter-looking-at-me",
} as const satisfies Track
