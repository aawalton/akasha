import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedImpossible = {
  id: "01a0a5ae-c8be-7f30-944f-a625d230964d",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-impossible",
  ownLength: 3.3897666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aBTWIK4C9Tx5D5PjtwOKR",
      externalLink: "https://open.spotify.com/track/3aBTWIK4C9Tx5D5PjtwOKR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Impossible",
} as const satisfies Track
