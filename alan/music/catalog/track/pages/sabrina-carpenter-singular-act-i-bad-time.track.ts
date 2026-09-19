import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIBadTime = {
  id: "01a0b111-26b0-7555-b41d-2377991e9b1c",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-bad-time",
  ownLength: 3.07555,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YqPDOmooQQIXsRSdbRrwI",
      externalLink: "https://open.spotify.com/track/1YqPDOmooQQIXsRSdbRrwI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bad Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "badtime|74KM79TiuVKeVCqs8QtB0B|184533",
  song: "song/sabrina-carpenter-bad-time",
} as const satisfies Track
