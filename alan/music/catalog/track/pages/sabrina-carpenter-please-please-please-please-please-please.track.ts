import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePleasePleasePleasePlease = {
  id: "01a0b111-2aec-75cd-8f02-48cf06f08688",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-please-please-please",
  ownLength: 3.1060833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N3hjp1WNayUPZrA8kJmJP",
      externalLink: "https://open.spotify.com/track/5N3hjp1WNayUPZrA8kJmJP",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleaseplease|74KM79TiuVKeVCqs8QtB0B|186365",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
