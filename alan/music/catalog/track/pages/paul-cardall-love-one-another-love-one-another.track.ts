import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLoveOneAnotherLoveOneAnother = {
  id: "01a0b4c8-6963-7a13-9f61-8a8a8bdc6e49",
  type: "page-type/track",
  slug: "paul-cardall-love-one-another-love-one-another",
  ownLength: 4.01385,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-love-one-another"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6jSeWJeDXcej6tOXk4QB4n",
      externalLink: "https://open.spotify.com/track/6jSeWJeDXcej6tOXk4QB4n",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Love One Another",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveoneanother|7FQRbf8gbKw8KZQZAJWxH2|240831",
} as const satisfies Track
