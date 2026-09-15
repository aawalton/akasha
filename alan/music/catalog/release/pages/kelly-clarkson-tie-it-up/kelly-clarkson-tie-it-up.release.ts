import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonTieItUp = {
  id: "01a0676a-d72e-7041-8555-f042edd2b208",
  type: "release",
  slug: "kelly-clarkson-tie-it-up",
  title: "Tie It Up",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 2.798433,
  ownProgress: 2.798433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-06-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "19ib87nPhblt4szZPG499r",
      externalLink: "https://open.spotify.com/album/19ib87nPhblt4szZPG499r",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
