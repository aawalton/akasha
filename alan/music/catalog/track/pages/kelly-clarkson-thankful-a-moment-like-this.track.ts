import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulAMomentLikeThis = {
  id: "01a0a5ae-cdaa-77ed-88f4-823789c02b5f",
  type: "track",
  slug: "kelly-clarkson-thankful-a-moment-like-this",
  ownLength: 3.804666666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kvdX9zzsix7jYHsRVkVUH",
      externalLink: "https://open.spotify.com/track/4kvdX9zzsix7jYHsRVkVUH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "A Moment Like This",
} as const satisfies Track
