import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenWasatch = {
  id: "01a0b4c8-4983-794d-9b25-ef5cc957fb84",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-wasatch",
  ownLength: 3.608,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KkSOna76u6Lh7AMniVilR",
      externalLink: "https://open.spotify.com/track/3KkSOna76u6Lh7AMniVilR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wasatch",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wasatch|7FQRbf8gbKw8KZQZAJWxH2|216480",
  song: "song/paul-cardall-wasatch",
} as const satisfies Track
