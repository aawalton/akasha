import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberYeah = {
  id: "01a0a5ae-ca7a-72d2-a2f5-e8f67134f6a6",
  type: "track",
  slug: "kelly-clarkson-my-december-yeah",
  ownLength: 2.7048833333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oFm9PLUTytFcnmV8DO68G",
      externalLink: "https://open.spotify.com/track/3oFm9PLUTytFcnmV8DO68G",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Yeah",
} as const satisfies Track
