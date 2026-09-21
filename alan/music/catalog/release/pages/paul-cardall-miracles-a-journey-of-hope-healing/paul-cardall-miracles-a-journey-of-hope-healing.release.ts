import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallMiraclesAJourneyOfHopeHealing = {
  id: "01a0676a-d724-7071-9960-e14c2a477ae2",
  type: "page-type/release",
  slug: "paul-cardall-miracles-a-journey-of-hope-healing",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2004-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "528gkSTdmuVzXaQtOWzioW",
      externalLink: "https://open.spotify.com/album/528gkSTdmuVzXaQtOWzioW",
    },
  ],
  title: "Miracles - A Journey Of Hope & Healing",
} as const satisfies Release
