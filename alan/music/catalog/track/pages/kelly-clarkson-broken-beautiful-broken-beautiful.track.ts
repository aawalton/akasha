import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBrokenBeautifulBrokenBeautiful = {
  id: "01a0a5ae-d55b-7a14-af0b-74481fe54519",
  type: "page-type/track",
  slug: "kelly-clarkson-broken-beautiful-broken-beautiful",
  ownLength: 3.6491333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-broken-beautiful"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Y9cAYTmyWJCcmfqdG2I29",
      externalLink: "https://open.spotify.com/track/1Y9cAYTmyWJCcmfqdG2I29",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Broken & Beautiful",
} as const satisfies Track
