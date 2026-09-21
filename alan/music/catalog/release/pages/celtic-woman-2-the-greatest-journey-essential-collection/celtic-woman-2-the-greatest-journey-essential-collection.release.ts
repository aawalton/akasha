import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollection = {
  id: "01a0676a-d72d-701a-b92b-c45aad6ba1f1",
  type: "page-type/release",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2008-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Gcai6e7rxHo6nliZntVCs",
      externalLink: "https://open.spotify.com/album/6Gcai6e7rxHo6nliZntVCs",
    },
  ],
  title: "The Greatest Journey - Essential Collection",
} as const satisfies Release
