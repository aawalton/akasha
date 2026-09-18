import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoNaturesAfternoon = {
  id: "01a0b4c8-3362-7b93-a9a5-d4ded7d44176",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-natures-afternoon",
  ownLength: 3.0691,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6cXVYNqcoEvYXtJmxFSsh9",
      externalLink: "https://open.spotify.com/track/6cXVYNqcoEvYXtJmxFSsh9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Nature's Afternoon",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "naturesafternoon|7FQRbf8gbKw8KZQZAJWxH2|184146",
} as const satisfies Track
