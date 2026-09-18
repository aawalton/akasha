import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriend = {
  id: "01a0b637-e8e8-77f0-9265-323ab8030966",
  type: "page-type/release",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend",
  ownLength: 3.698,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-09-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GC5RsektkinWzFaB283ht",
      externalLink: "https://open.spotify.com/album/6GC5RsektkinWzFaB283ht",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "All My Demons Greeting Me As A Friend",
} as const satisfies Release
