import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheVeryBestOfEnyaDeluxeEditionOneByOne = {
  id: "01a0a5b0-2799-7ff0-b1cf-183ce45de3f3",
  type: "page-type/track",
  slug: "enya-the-very-best-of-enya-deluxe-edition-one-by-one",
  ownLength: 3.9444333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-very-best-of-enya-deluxe-edition"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7zkhumvpBOXuA3PA2ZhB6C",
      externalLink: "https://open.spotify.com/track/7zkhumvpBOXuA3PA2ZhB6C",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One by One",
} as const satisfies Track
